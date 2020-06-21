<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $fillable = ['id', 'key', 'user_id'];

    /**
     * @return HasMany
     */
    public function items()
    {
        return $this->hasMany('App\Models\CartItem', 'Cart_id');
    }
}
