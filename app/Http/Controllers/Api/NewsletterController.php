<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\NewsletterFilter;
use App\Http\Requests\NewsletterRequest;
use App\Http\Resources\NewsletterResource;
use App\Models\Newsletter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        /** @var NewsletterFilter $filter */
        $filter = app(NewsletterFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Newsletter::filtered($filter);
        $newsletters = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return NewsletterResource::collection($newsletters);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return NewsletterResource
     */
    public function store(NewsletterRequest $request)
    {
        $newsletter = Newsletter::create($request->all());
        $newsletter->refresh();
        return new NewsletterResource($newsletter);
    }

    /**
     * Display the specified resource.
     *
     * @param Newsletter $newsletter
     * @return NewsletterResource
     */
    public function show(Newsletter $newsletter)
    {
        return new NewsletterResource($newsletter);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param NewsletterRequest $request
     * @param Newsletter $newsletter
     * @return NewsletterResource
     */
    public function update(NewsletterRequest $request, Newsletter $newsletter)
    {
        $newsletter->fill($request->all());
        $newsletter->save();
        return new NewsletterResource($newsletter);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Newsletter $newsletter
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Newsletter $newsletter)
    {
        $newsletter->delete();
        return response()->json([], 204);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param Newsletter $newsletter
     * @return JsonResponse
     * @throws \Exception
     */
    public function restore(Newsletter $newsletter)
    {
        $newsletter->restore();
        return response()->json([], 204);
    }
}
