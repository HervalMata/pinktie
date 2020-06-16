<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['product_name', 'slug', 'product_code', 'description', 'quantity', 'price', 'active', 'category_id'];

    /**
     * @return BelongsTo
     */
    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
}
