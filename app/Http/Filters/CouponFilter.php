<?php


namespace App\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CouponFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['amount_type', 'status', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('amount_type', 'LIKE', "%$value%");
    }
}
