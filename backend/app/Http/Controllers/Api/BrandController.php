<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreBrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Services\BrandService;
use DomainException;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BrandController extends Controller
{
    public function __construct(
        private readonly BrandService $brandService,
    ) {
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        return BrandResource::collection(
            $this->brandService->getAll(
                $request->string('search')->toString()
            )
        );
    }

    public function store(StoreBrandRequest $request): BrandResource
    {
        return new BrandResource(
            $this->brandService->create(
                $request->validated()
            )
        );
    }

    public function show(Brand $brand): BrandResource
    {
        return new BrandResource(
            $this->brandService->getById($brand)
        );
    }

    public function update(
        UpdateBrandRequest $request,
        Brand $brand,
    ): BrandResource {
        return new BrandResource(
            $this->brandService->update(
                $brand,
                $request->validated()
            )
        );
    }

    public function destroy(Brand $brand)
    {
        try {
            $this->brandService->delete($brand);

            return ApiResponse::success(
                null,
                'Brand deleted successfully.'
            );
        } catch (DomainException $exception) {
            return ApiResponse::error(
                $exception->getMessage(),
                422
            );
        }
    }
}