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
});

