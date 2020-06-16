<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 16/06/2020
 * Time: 14:37
 */

namespace App\Http\Filters;


use Illuminate\Database\Eloquent\Builder;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['product_name', 'category_name', 'price', 'quantity', 'created_at'];

    /**
     * @param $value
     */
    protected function applySearch($value)
    {
        $this->query->where('product_name', 'LIKE', "%$value%")
                    ->orWhere('description', 'LIKE', "%$value%");
    }

    /**
     * @param $order
     */
    protected function applySortCategoryName($order)
    {
        $this->query->orderBy('category_name', $order);
    }

    /**
     * @param $order
     */
    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('products.created_at', $order);
    }

    /**
     * @return bool
     */
    public function hasFilterParamter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }

    /**
     * @param Builder $query
     * @return Builder
     */
    public function apply($query)
    {
        $query = $query->select('products.*')
            ->join('categories', 'categories.id', '=', 'products.category_id');
        return parent::apply($query);
    }
}
