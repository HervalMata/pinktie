<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Category;
use App\Models\Product;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Product::class, function (Faker $faker) {
    $categories = Category::all();
    $category = $categories->random();
    $name = $faker->word;
    return [
        'product_name' => $name,
        'slug' => Str::slug($name),
        'product_code' => $faker->uuid,
        'description' => $faker->paragraph,
        'stock' =>$faker->numberBetween(1, 10),
        'price' => $faker->randomFloat(2, 1, 12),
        'category_id' => $category->id
    ];
});
