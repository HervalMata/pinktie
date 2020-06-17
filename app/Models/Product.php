<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use SoftDeletes;
    use Filterable;

    protected $dates = ['deleted_at'];

    protected $fillable = ['product_name', 'slug', 'product_code', 'description', 'stock', 'price', 'active', 'category_id'];

    /**
     * @return BelongsTo
     */
    public function categories()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsToMany
     */
    public function colors()
    {
        return $this->belongsToMany(Color::class);
    }

    /**
     * @return BelongsToMany
     */
    public function materials()
    {
        return $this->belongsToMany(Material::class);
    }
}
