<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    protected $fillable = ['user_id', 'cidade_id', 'country', 'address', 'number', 'additional', 'province', 'cpf', 'photo', 'telefone', 'mobile'];

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo
     */
    public function cidade()
    {
        return $this->belongsTo(Cidade::class);
    }
}
