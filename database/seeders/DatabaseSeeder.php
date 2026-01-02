<?php

namespace Database\Seeders;

use App\Models\Band;
use App\Models\Genre;
use App\Models\Release;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Registrar el seeder si se crean especificos
        // $this->call([
        //     BandSeeder::class,
        // ]);

        $faker = \Faker\Factory::create();

        Genre::create([
            'name' => "Heavy Metal"
        ]);


        Genre::create([
            'name' => "Doom Metal"
        ]);

        Band::create([
            'name' => "Black Sabbath",
            'genres_id' => json_encode([1, 2]),
            'formed_year' => 1969,
            'country' => 'United Kingdom',
            'rating' => 10,
        ]);

        $album1 = Release::create([
            // 'band_id' => json_encode([1]),
            'name' => "Black Sabbath",
            'type' => "LP",
            'release_date' => $faker->date,
        ]);


        
        $album1->bands()->attach([1]);

        $album2 = Release::create([
            // 'band_id' => json_encode([1]),
            'name' => "Paranoid",
            'type' => "LP",
            'release_date' => $faker->date,
        ]);

        $album2->bands()->attach([1]);


        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
