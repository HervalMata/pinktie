<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Newsletter;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Newsletter::class, function (Faker $faker) {
    return [
        'email' => $faker->safeEmail,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ];
});
