<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\CouponFilter;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\CouponResource;
use App\Models\Coupon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        /** @var CouponFilter $filter */
        $filter = app(CouponFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Coupon::filtered($filter);
        $coupons = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return CouponResource::collection($coupons);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return CouponResource
     */
    public function store(CouponRequest $request)
    {
        $coupon = Coupon::create($request->all());
        $coupon->refresh();
        return new CouponResource($coupon);
    }

    /**
     * Display the specified resource.
     *
     * @param Coupon $coupon
     * @return CouponResource
     */
    public function show(Coupon $coupon)
    {
        return new CouponResource($coupon);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CouponRequest $request
     * @param Coupon $coupon
     * @return CouponResource
     */
    public function update(CouponRequest $request, Coupon $coupon)
    {
        $coupon->fill($request->all());
        $coupon->save();
        return new CouponResource($coupon);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Coupon $coupon
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Coupon $coupon)
    {
        $coupon->delete();
        return response()->json([], 204);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param Coupon $coupon
     * @return JsonResponse
     * @throws \Exception
     */
    public function restore(Coupon $coupon)
    {
        $coupon->restore();
        return response()->json([], 204);
    }
}
