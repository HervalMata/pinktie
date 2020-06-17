<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 17/06/2020
 * Time: 12:22
 */

namespace App\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['name', 'email', 'created_at'];

    /**
     * @param $value
     */
    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%")
            ->orWhere('email', 'LIKE', "%$value%");
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
}
