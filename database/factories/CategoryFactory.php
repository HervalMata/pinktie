<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Category;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Category::class, function (Faker $faker) {
    $name = $faker->word;
    return [
        'category_name' => $name,
        'slug' => Str::slug($name),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
