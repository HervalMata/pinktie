<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Wishlist::class, function (Faker $faker) {
    $products = Product::all();
    $product = $products->random();
    $users = User::all();
    $user = $users->random();
    return [
        'user_id' => $user->id,
        'product_id' => $product->id,
        'quantity' => $faker->numberBetween(1, 3),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
