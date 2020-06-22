<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [ 'coupon_code', 'amount', 'amount_type', 'expiry_date', 'status'];
}
