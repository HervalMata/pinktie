<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $fillable = ['estado', 'sigla'];

    public function cities()
    {
        return $this->hasMany(Cidade::class);
    }
}
