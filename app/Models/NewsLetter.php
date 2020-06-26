<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Newsletter extends Model
{
    use Filterable;

    protected $fillable= ['email', 'status'];
}
