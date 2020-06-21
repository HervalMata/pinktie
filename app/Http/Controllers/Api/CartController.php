<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Http\Requests\CategoryRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
