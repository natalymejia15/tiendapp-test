<?php

declare(strict_types=1);

namespace App\Http\Requests\Product;

use App\Enums\UnitEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'brand_id' => ['required', 'exists:brands,id'],

            'name' => ['required', 'string', 'max:150'],

            'unit' => [
                'required',
                new Enum(UnitEnum::class),
            ],

            'observations' => ['required', 'string'],

            'inventory_quantity' => [
                'required',
                'integer',
                'min:0',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'brand_id.required' => 'The brand is required.',
            'brand_id.exists' => 'The selected brand is invalid.',

            'name.required' => 'The name field is required.',

            'observations.required' => 'The observations field is required.',

            'inventory_quantity.required' => 'The inventory quantity is required.',
            'inventory_quantity.min' => 'Inventory quantity cannot be negative.',
        ];
    }
}