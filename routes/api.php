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
    Route::get('shop', 'ShopController@productsListing');
    Route::get('shop/{product}', 'ShopController@productDetail');
    Route::get('shop/product/category/{category}', 'ShopController@productsRecommended');
    Route::get('shop/product/featured', 'ShopController@productsFeatured');
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
            'product.colors' ,'ProductColorController',
            ['only' => ['index', 'store', 'destroy']]
        );
        Route::apiResources([
            'materials' => 'MaterialController'
        ]);
        Route::patch('materials/{material}/restore', 'MaterialController@restore');
        Route::resource(
            'product.materials' ,'ProductMaterialController',
            ['only' => ['index', 'store', 'destroy']]
        );
        Route::apiResources([
            'products.photos' => 'ProductPhotoController'
        ]);
        Route::apiResources([
            'users' => 'UserController'
        ]);
        Route::patch('profile', 'UserProfileController@update');
    });
});

