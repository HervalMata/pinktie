<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cidade extends Model
{
    protected $fillable = ['cidade', 'estado_id'];

    /**
     * @return BelongsTo
     */
    public function states()
    {
        return $this->belongsTo(Estado::class);
    }
}
