<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getAll(?string $search = null): LengthAwarePaginator
    {
        return Product::query()
            ->when(
                $search,
                fn ($query) => $query->where('name', 'like', "%{$search}%")
            )
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();
    }

    public function getById(Product $product): Product
    {
        return $product;
    }

    public function create(array $data): Product
    {
        return DB::transaction(
            fn () => Product::create($data)
        );
    }

    public function update(Product $product, array $data): Product
    {
        return DB::transaction(function () use ($product, $data) {
            $product->update($data);

            return $product->refresh();
        });
    }

    public function delete(Product $product): void
    {
        DB::transaction(
            fn () => $product->delete()
        );
    }
}
