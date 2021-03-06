<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['namespace' => 'Api', 'as' => 'api.'], function () {
    Route::name('login')->post('login', 'AuthController@login');
    Route::name('refresh')->post('refresh', 'AuthController@refresh');
    Route::get('shop/category/{category}', 'ShopController@productsByCategory');
    Route::get('shop/category', 'ShopController@categoriesAll');
    Route::get('shop', 'ShopController@productsListing');
    Route::get('shop/1', 'ShopController@productsListing1');
    Route::get('shop/2', 'ShopController@productsListing2');
    Route::get('shop/{product}', 'ShopController@productDetail');
    Route::get('shop/product/category/{category}', 'ShopController@productsRecommended');
    Route::get('shop/product/featured', 'ShopController@productsFeatured');
    Route::post('carts/{cart}', 'CartController@addProducts');
    Route::post('carts/checkout', 'CartController@checkout');
    Route::get('order/user', 'UserOrderController@ordersByUser');
    Route::get('order/user/{order}', 'UserOrderController@orderByUser');
    Route::get('coupon/shop/{coupon}', 'CouponShopController@showCoupon');
    Route::post('newslwtter/store', 'NewsletterShopController@newsletterStore');
    Route::post('wishlist/store', 'WishlistShopController@wishlistStore');
    Route::get('wishlist/{wishlist}', 'WishlistShopController@wishlistShow');
    Route::delete('wishlist/{wishlist}', 'WishlistShopController@wishlistDestroy');
    Route::apiResources([
        'carts' => 'CartController'
    ]);
    Route::resource('customers', 'CustomerController', ['only' => ['store', 'update']]);
    Route::group(['middleware' => 'auth:api', 'jwt.refresh'], function () {
        Route::name('me')->post('me', 'AuthController@me');
        Route::name('logout')->post('logout', 'AuthController@logout');
        Route::apiResources([
            'categories' => 'CategoryController'
        ]);
        Route::patch('categories/{category}/restore', 'CategoryController@restore');
        Route::apiResources([
            'products' => 'ProductController'
        ]);
        Route::patch('products/{product}/restore', 'ProductController@restore');
        Route::apiResources([
            'colors' => 'ColorController'
        ]);
        Route::patch('colors/{color}/restore', 'ColorController@restore');
        Route::resource(
            'products.colors' ,'ProductColorController',
            ['only' => ['index', 'store', 'destroy']]
        );
        Route::apiResources([
            'materials' => 'MaterialController'
        ]);
        Route::patch('materials/{material}/restore', 'MaterialController@restore');
        Route::resource(
            'products.materials' ,'ProductMaterialController',
            ['only' => ['index', 'store', 'destroy']]
        );
        Route::apiResources([
            'products.photos' => 'ProductPhotoController'
        ]);
        Route::apiResources([
            'users' => 'UserController'
        ]);
        Route::patch('profile', 'UserProfileController@update');
        Route::apiResources([
            'orders' => 'OrderController'
        ]);
        Route::apiResources([
            'coupons' => 'CouponController'
        ]);
        Route::apiResources([
            'newsletters' => 'NewsletterController'
        ]);
        Route::apiResources([
            'wishlists' => 'WishlistController'
        ]);
    });
});

