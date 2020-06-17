<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $fillable = ['estado', 'sigla'];

    public function cities()
    {
        return $this->hasMany(City::class);
    }
}
