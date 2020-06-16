<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\ColorFilter;
use App\Http\Requests\ColorRequest;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        /** @var ColorFilter $filter */
        $filter = app(ColorFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Color::filtered($filter);
        $colors = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return ColorResource::collection($colors);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ColorRequest $request
     * @return ColorResource
     */
    public function store(ColorRequest $request)
    {
        $color = Color::create($request->all());
        $color->refresh();
        return new ColorResource($color);
    }

    /**
     * Display the specified resource.
     *
     * @param Color $color
     * @return ColorResource
     */
    public function show(Color $color)
    {
        return new ColorResource($color);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ColorRequest $request
     * @param Color $color
     * @return ColorResource
     */
    public function update(ColorRequest $request, Color $color)
    {
        $color->fill($request->all());
        $color->save();
        return new ColorResource($color);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Color $color)
    {
        $color->delete();
        return response()->json([], 204);
    }
}
