<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Faker\Generator as Faker;

$factory->define(Wishlist::class, function (Faker $faker) {
    $products = Product::all();
    $product = $products->random();
    $users = User::all();
    $user = $users->random();
    return [
        'user_id' => $user->id,
        'product_id' => $product->id,
        'quantity' => $faker->numberBetween(1, 3)
    ];
});
