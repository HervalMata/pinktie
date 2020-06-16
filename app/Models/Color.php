<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Color extends Model
{
    use SoftDeletes;
    use Filterable;

    protected $dates = ['deleted_at'];

    protected $fillable = ['color_name', 'slug'];
}
