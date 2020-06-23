<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsletterRequest;
use App\Http\Resources\NewsletterResource;
use App\Models\NewsLetter;
use Illuminate\Http\Request;

class NewsletterShopController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return NewsletterResource
     */
    public function NewsletterStore(NewsletterRequest $request)
    {
        $newsletter = Newsletter::create($request->all());
        $newsletter->refresh();
        return new NewsletterResource($newsletter);
    }
}
