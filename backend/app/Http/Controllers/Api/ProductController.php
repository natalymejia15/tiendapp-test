<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
    ) {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        return ProductResource::collection(
            $this->productService->getAll(
                $request->string('search')->toString()
            )
        );
    }

    public function store(StoreProductRequest $request): ProductResource
    {
        return new ProductResource(
            $this->productService->create(
                $request->validated()
            )
        );
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource(
            $this->productService->getById($product)
        );
    }

    public function update(
        UpdateProductRequest $request,
        Product $product,
    ): ProductResource {
        return new ProductResource(
            $this->productService->update(
                $product,
                $request->validated()
            )
        );
    }

    public function destroy(Product $product)
    {
        $this->productService->delete($product);

        return ApiResponse::success(
            null,
            'Product deleted successfully.'
        );
    }
}