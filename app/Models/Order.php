<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'products', 'totalPrice',
        'user_id', 'transactionID',
        'name', 'address', 'number',
        'cidade_id', 'province', 'mobile',
        'additional', 'cpf', 'country', 'telefone'];
}
