<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Product
 */
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'brand_id' => $this->brand_id,
            'name' => $this->name,
            'unit' => $this->unit,
            'observations' => $this->observations,
            'inventory_quantity' => $this->inventory_quantity,

            'brand' => new BrandResource($this->whenLoaded('brand')),
        ];
    }
}