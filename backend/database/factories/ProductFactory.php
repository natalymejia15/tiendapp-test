<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\UnitEnum;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'brand_id' => Brand::factory(),
            'name' => fake()->words(3, true),
            'unit' => fake()->randomElement(
                array_map(
                    fn (UnitEnum $unit) => $unit->value,
                    UnitEnum::cases()
                )
            ),
            'observations' => fake()->sentence(),
            'inventory_quantity' => fake()->numberBetween(0, 500),
        ];
    }
}