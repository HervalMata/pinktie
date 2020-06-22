<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserOrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class UserOrderController extends Controller
{

    /**
     * @return AnonymousResourceCollection
     */
    public function ordersByUser()
    {
        if (Auth::guard('api')->check()) {
            $user_id = \auth('api')->user()->getKey();
        }
        $orders = Order::with('cities')->where('user_id', $user_id);
        return UserOrderResource::collection($orders);
    }

    /**
     * @param Order $order
     * @return UserOrderResource
     */
    public function orderByUser(Order $order)
    {
        if (Auth::guard('api')->check()) {
            return new UserOrderResource($order);
        }
    }
}
