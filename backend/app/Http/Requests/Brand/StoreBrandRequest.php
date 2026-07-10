<?php

declare(strict_types=1);

namespace App\Http\Requests\Brand;

use Illuminate\Foundation\Http\FormRequest;

class StoreBrandRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reference' => ['required', 'string', 'max:50', 'unique:brands,reference'],
            'name' => ['required', 'string', 'max:150'],
        ];
    }

    public function messages(): array
    {
        return [
            'reference.required' => 'The reference field is required.',
            'reference.unique' => 'The reference already exists.',
            'reference.max' => 'The reference may not be greater than 50 characters.',

            'name.required' => 'The name field is required.',
            'name.max' => 'The name may not be greater than 150 characters.',
        ];
    }
}