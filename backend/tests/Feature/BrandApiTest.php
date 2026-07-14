<?php

namespace Tests\Feature;

use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BrandApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_all_brands_without_pagination(): void
    {
        Brand::factory()->count(12)->create();

        $response = $this->getJson('/api/brands');

        $response->assertOk();
        $response->assertJsonCount(12, 'data');
        $response->assertJsonMissingPath('meta');
    }
}
