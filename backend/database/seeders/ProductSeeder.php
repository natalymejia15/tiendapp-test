<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Brand::all()->each(function (Brand $brand) {
            Product::factory()
                ->count(rand(3, 8))
                ->create([
                    'brand_id' => $brand->id,
                ]);
        });
    }
}