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
        ]);

        Release::create([
            'band_id' => json_encode([1]),
            'name' => "Black Sabbath",
            'type' => "LP",
        ]);

        Release::create([
            'band_id' => json_encode([1]),
            'name' => "Paranoid",
            'type' => "LP",
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
