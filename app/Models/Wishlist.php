<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Wishlist extends Model
{
    use Filterable;

    protected $fillable = ['user_id', 'product_id', 'quantity'];
}
