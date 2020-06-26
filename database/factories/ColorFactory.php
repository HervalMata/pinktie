<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Color;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Color::class, function (Faker $faker) {
    $name = $faker->colorName;
    return [
        'color_name' => $name,
        'slug' => Str::slug($name),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
