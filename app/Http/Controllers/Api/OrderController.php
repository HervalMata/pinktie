<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $orders = Order::with('cities', 'users')->paginate(10);
        return OrderResource::collection($orders);
    }
}
