<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CartItemCollection;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Payment\PagSeguro\CreditCard;
use App\Payment\PagSeguro\Notification;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;
use Ramsey\Uuid\Uuid;

class CartController extends Controller
{
    /**
     * @param CartRequest $request
     * @return JsonResponse
     */
    public function store(CartRequest $request)
    {
        if (Auth::guard('api')->check()) {
            $user_id = \auth('api')->user()->getKey();
        }
        $cart = Cart::create([
            'id' => md5(uniqid(rand(), true)),
            'key' => md5(uniqid(rand(), true)),
            'user_id' => isset($user_id) ? $user_id : null,
        ]);
        return response()->json([
            'Message' => 'Um novo carrinho de compras foi criado por você',
            'token' => $cart->id,
            'key' => $cart->key
        ], 201);
    }

    /**
     * @param Request $request
     * @param Cart $cart
     * @return JsonResponse
     */
    public function show(Request $request, Cart $cart)
    {
        $validator = Validator::make($request->all(), ['key' => 'required']);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $key = $request->input('key');
        if ($cart->key == $key) {
            return response()->json(['cart' => $cart->id, 'Items in cart' => new CartItemCollection($cart->items)], 200);
        } else {
            return response()->json([
                'message' => 'O Carrinho de compras é inválido'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Cart $cart
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, Cart $cart)
    {
        $validator = Validator::make($request->all(), ['key' => 'required']);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $key = $request->input('key');
        if ($cart->key == $key) {
            $cart->delete();
            return response()->json(null, 204);
        } else {
            return response()->json([
                'message' => 'O Carrinho de compras é inválido'
            ], 400);
        }
    }


    /**
     * @param CartRequest $request
     * @param Cart $cart
     * @return JsonResponse
     */
    public function addProducts(CartRequest $request, Cart $cart)
    {
        $key = $request->input('key');
        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');

        if ($cart->key == $key) {
            try {
                $product = Product::findOrFail($product_id);
            } catch (ModelNotFoundException $e) {
                return response()->json([
                    'message' => 'O Produto que você está tentando adicionar não existe'
                ], 404);
            }
            $cartItem = CartItem::where(['cart_id' => $cart->getKey(), 'product_id' => $product_id])->first();
            if ($cartItem) {
                $cartItem->quantity = $quantity;
                CartItem::where(['cart_id' => $cart->getKey(), 'product_id' => $product_id])->update(['quantity' => $quantity]);
            } else {
                CartItem::create(['cart_id' => $cart->getKey(), 'product_id' => $product_id, 'quantity' => $quantity]);
            }
            return response()->json(['message' => 'O Carrinho de compras foi atualizado com sucesso'], 200);
        } else {
            return response()->json([
                'message' => 'O Carrinho de compras é inválido'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Cart $cart
     * @return JsonResponse
     * @throws \Exception
     */
    public function checkout(Request $request, Cart $cart)
    {
        if (Auth::guard('api')->check()) {
            $user_id = \auth('api')->user()->getKey();
        }
        $validator = Validator::make($request->all(), [
            'key' => 'required',
            'name' => 'required',
            'address' => 'required',
            'number' => 'required',
            'cidade_id' => 'required',
            'country' => 'required',
            'cpf' => 'required',
            'mobile' => 'required',
            'credit_card_number' => 'required',
            'expiration_year' => 'required',
            'expiration_month' => 'required',
            'cvc' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $this->makePagSeguroSession();
        $key = $request->input('key');
        if ($cart->key == $key) {
            $name = $request->input('name');
            $address = $request->input('address');
            $number = $request->input('number');
            $additional = $request->input('additional');
            $cidade_id = $request->input('cidade_id');
            $province = $request->input('province');
            $country = $request->input('country');
            $cep = $request->input('cep');
            $cpf = $request->input('cpf');
            $telefone = $request->input('telefone');
            $mobile = $request->input('mobile');
            $cresit_card_number = $request->input('cresit_card_number');
            $TotalPrice = (float) 0.0;
            $items = $cart->items;
            foreach ($items as $item) {
                $product = Product::find($item->product_id);
                $price = $product->price;
                $stock = $product->stock;
                if ($stock >= $item->quantity) {
                    $TotalPrice = $TotalPrice + ($price * $item->quantity);
                    $product->stock = $product->stock - $item->quantity;
                    $product->save();
                } else {
                    return response()->json([
                        'message' => 'A quantidade que você quer comprar ' . $item->name .
                            ' não está disponivel em estoque, somente existem ' . $stock .
                            ' unidades no estoque, por favor atualize carrinho para continuar'
                    ], 400);
                }
            }
            $paymentGatewayResponse = true;
            $transactionID = md5(uniqid(rand(), true));
            if ($paymentGatewayResponse) {
                $order = Order::create([
                    'products' => json_encode(new CartItemCollection($items)),
                    'totalPrice' => $TotalPrice,
                    'name' => $name,
                    'address' => $address,
                    'number' => $number,
                    'additional' => $additional,
                    'cidade_id' => $cidade_id,
                    'province' => $province,
                    'country' => $country,
                    'cep' => $cep,
                    'cpf' => $cpf,
                    'telefone' => $telefone,
                    'mobile' => $mobile,
                    'user_id' => isset($user_id) ? $user_id : null,
                    'transactionID' => $transactionID
                ]);
                $cart->delete();
                return response()->json([
                    'message' => 'Sua Compra foi completada com sucesso, Obrigado por comprar conosco!',
                    'orderID' => $order->getKey()
                ], 200);
            }
        } else {
            return response()->json([
                'message' => 'O Carrinho de compras é inválido'
            ], 400);
        }
    }

    /**
     * @param Request $request
     * @param Cart $cart
     * @return JsonResponse
     */
    public function proccess(Request $request, Cart $cart)
    {
        try {
            $dataPost = $request->all();
            $user = \auth()->user();
            $cartItems = $cart->items;
            $reference = Uuid::uuid4();
            $creditCardPayment = new CreditCard($cartItems, $user, $dataPost, $reference);
            $result = $creditCardPayment->doPayment();
            $userOrder = [
                'reference' => $reference,
                'pagseguro_code' => $result->getCode(),
                'pagamento_status' => $result->getStatus(),
                'items' => serialize($cartItems)
            ];
            $user->orders()->create($userOrder);
            return response()->json([
                'data' => [
                    'status' => true,
                    'message' => 'Ordem criada com sucesso',
                    'order' => $reference
                ]
            ]);
        } catch (\Exception $e) {
            $message = env('APP_DEBUG') ? simplexml_load_string($e->getMessage()) : 'Erro ao processar a requisição';
            return response()->json([
                'data' => [
                    'status' => true,
                    'message' => $message
                ]
            ], 401);
        }
    }

    /**
     * @return JsonResponse
     */
    public function notification()
    {
        try {
            $notification = new Notification();
            $notification = $notification->getTransaction();
            $reference = base64_decode($notification->getReference());
            $userOrder = Order::whereReference($reference);
            $userOrder->update([
                'pagseguro_status' => $notification->getStaus()
            ]);
            if ($notification->getStatus() === 3) {

            }
            return response()->json([], 204);
        } catch (\Exception $e) {
            $message = env('APP_DEBUG') ? $e->getMessage() : '';
            return response()->json([
                'error' => $message
            ], 500);
        }
    }

    /**
     * @throws \Exception
     */
    private function makePagSeguroSession()
    {
        if (!session()->has('pagseguro_session_code'))
        {
            $sessionCode = \PagSeguro\Services\Session::create(
                \PagSeguro\Configuration\Configure::getAccountCredentials()
            );
        }
        session()->put('pagseguro_session_code', $sessionCode->getResult());
    }
}
