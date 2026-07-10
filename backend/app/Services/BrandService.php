<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Brand;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class BrandService
{
    public function getAll(?string $search = null): LengthAwarePaginator
    {
        return Brand::query()
            ->when(
                $search,
                fn ($query) => $query->where('name', 'like', "%{$search}%")
                    ->orWhere('reference', 'like', "%{$search}%")
            )
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();
    }

    public function getById(Brand $brand): Brand
    {
        return $brand;
    }

    public function create(array $data): Brand
    {
        return DB::transaction(
            fn () => Brand::create($data)
        );
    }

    public function update(Brand $brand, array $data): Brand
    {
        return DB::transaction(function () use ($brand, $data) {
            $brand->update($data);

            return $brand->refresh();
        });
    }

    public function delete(Brand $brand): void
    {
        DB::transaction(function () use ($brand) {

            if ($brand->products()->exists()) {
                throw new \DomainException(
                    'Cannot delete a brand with associated products.'
                );
            }

            $brand->delete();
        });
    }
}
