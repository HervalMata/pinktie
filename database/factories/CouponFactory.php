<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Coupon;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Coupon::class, function (Faker $faker) {
    return [
        'coupon_code' => Str::random(8),
        'amount' => $faker->numberBetween(10, 30),
        'amount_type' => 'Percentage',
        'expire_date' => Carbon::next(30),
        'status' => 0
    ];
});
