<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Coupon extends Model
{
    use Filterable;

    protected $fillable = [ 'coupon_code', 'amount', 'amount_type', 'expiry_date', 'status'];
}
