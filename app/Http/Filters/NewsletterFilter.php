<?php


namespace App\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class NewsletterFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['email', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('email', 'LIKE', "%$value%");
    }
}
