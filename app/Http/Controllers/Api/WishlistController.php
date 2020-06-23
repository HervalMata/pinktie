<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WishlistRequest;
use App\Http\Resources\WishlistResource;
use App\Models\Wishlist;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $wishlists = Wishlist::with('products', 'users')->paginate(5);
        return WishlistResource::collection($wishlists);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return WishlistResource
     */
    public function store(WishlistRequest $request)
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
    public function show(Wishlist $whishlist)
    {
        return new WishlistResource($whishlist);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param WishlistRequest $request
     * @param Wishlist $whishlist
     * @return WishlistResource
     */
    public function update(WishlistRequest $request, Wishlist $whishlist)
    {
        $whishlist->fill($request->all());
        $whishlist->save();
        return new WishlistResource($whishlist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Wishlist $whishlist
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Wishlist $whishlist)
    {
        $whishlist->delete();
        return response()->json([], 204);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param Wishlist $whishlist
     * @return JsonResponse
     * @throws \Exception
     */
    public function restore(Wishlist $whishlist)
    {
        $whishlist->restore();
        return response()->json([], 204);
    }
}
