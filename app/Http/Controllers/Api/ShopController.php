<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ShopController extends Controller
{

    /**
     * @return AnonymousResourceCollection
     */
    public function productsListing()
    {
        $products = Product::with('categories')->where('active','=', true)
            ->where('stock', '>', 0)
            ->take(4)->get();
        return ProductResource::collection($products);
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function productsListing1()
    {
        $products = Product::with('categories')->where('active','=', true)
            ->where('stock', '>', 0)
            ->skip(4)->take(4)->get();
        return ProductResource::collection($products);
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function productsListing2()
    {
        $products = Product::with('categories')->where('active','=', true)
            ->where('stock', '>', 0)
            ->skip(8)->take(4)->get();
        return ProductResource::collection($products);
    }

    /**
     * @param Category $category
     * @return AnonymousResourceCollection
     */
    public function productsByCategory(Category $category)
    {
        $products = Product::where('active', true)
            ->where('stock', '>', 0)
            ->where('category_id', $category->id)
            ->get();
        return ProductResource::collection($products);
    }

    /**
     * @param Product $product
     * @return ProductResource
     */
    public function productDetail(Product $product)
    {
        $category_id = $product->categories()->id;
        $category = Category::find($category_id);
        $this->productsRecommended($category);
        return new ProductResource($product);
    }

    /**
     * @param Category $category
     * @return AnonymousResourceCollection
     */
    public function productsRecommended(Category $category)
    {
        $products = Product::where('active', true)
            ->where('stock', '>', 0)
            ->where('category_id', $category->id)
            ->take(5)
            ->get();
        return ProductResource::collection($products);
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function productsFeatured()
    {
        $products = Product::with('categories')->where('active','=', true)
            ->where('stock', '>', 0)->where('featured', '=', true)
            ->take(5)->get();
        return ProductResource::collection($products);
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function categoriesALL()
    {
        $categories = Category::where('active', true)->take(4)->get();
        return CategoryResource::collection($categories);
    }
}
