<?php

namespace Database\Seeders;

use App\Models\Band;
use Illuminate\Database\Seeder;

class BandSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            Band::create([
                'name' => $faker->company,
                // 'genre_id' => $faker->numberBetween(1, 5),
                'formed_year' => $faker->numberBetween(1970, 2020),
            ]);
        }
    }
}