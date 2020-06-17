<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Material;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Material::class, function (Faker $faker) {
    $name = $faker->company;
    return [
        'material_name' => $name,
        'slug' => Str::slug($name)
    ];
});
