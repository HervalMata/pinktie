<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WishlistRequest;
use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WihlistShopController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return WishlistResource
     */
    public function wishlistStore(WishlistRequest $request)
    {
        $whishlist = Wishlist::create($request->all());
        $whishlist->refresh();
        return new WishlistResource($whishlist);
    }

    /**
     * Display the specified resource.
     *
     * @param Wishlist $whishlist
     * @return WishlistResource
     */
    public function wishlistShow(Wishlist $whishlist)
    {
        return new WishlistResource($whishlist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Wishlist $whishlist
     * @return JsonResponse
     * @throws \Exception
     */
    public function wishlistDestroy(Wishlist $whishlist)
    {
        $whishlist->delete();
        return response()->json([], 204);
    }
}
