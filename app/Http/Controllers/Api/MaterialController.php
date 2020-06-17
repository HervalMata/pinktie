<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\MaterialFilter;
use App\Http\Requests\MaterialRequest;
use App\Http\Resources\MaterialResource;
use App\Models\Material;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        /** @var MaterialFilter $filter */
        $filter = app(MaterialFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Material::filtered($filter);
        $materials = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return MaterialResource::collection($materials);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param MaterialRequest $request
     * @return MaterialResource
     */
    public function store(MaterialRequest $request)
    {
        $material = Material::create($request->all());
        $material->refresh();
        return new MaterialResource($material);
    }

    /**
     * Display the specified resource.
     *
     * @param Material $material
     * @return MaterialResource
     */
    public function show(Material $material)
    {
        return new MaterialResource($material);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
