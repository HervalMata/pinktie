<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class City extends Model
{
    protected $fillable = ['cidade', 'state_id'];

    /**
     * @return BelongsTo
     */
    public function states()
    {
        return $this->belongsTo(State::class);
    }
}
