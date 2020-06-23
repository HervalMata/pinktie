<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CouponResource;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponShopController extends Controller
{
    /**
     * @param Coupon $coupon
     * @return CouponResource
     */
    public function showCoupon(Coupon $coupon)
    {
        return new CouponResource($coupon);
    }
}
