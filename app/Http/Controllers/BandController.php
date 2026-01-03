<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Genre;
use App\Models\Release;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BandController extends Controller
{
    //

    public function index()
    {

        // $all_bands = Band::all();
        $all_bands = Band::with('genres')->get();

        return Inertia::render("Bands/Bands", ([
            'bands' => $all_bands,
        ]));
    }


    public function show($id)
    {

        $band = Band::with('releases')->findOrFail($id);

        $band_genres = Band::with('genres');

        return Inertia::render('Bands/ShowBand', [
            'band' => $band,
            'releases' => $band->releases,
            'band_genres' => $band_genres,
        ]);
    }


    public function showAddBandForm(Request $request)
    {
        return Inertia::render("Bands/AddBand", ([
            'genres' => Genre::all()
        ]));
    }


    public function createBand(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'formed_year' => 'required|integer|min:1900|max:' . date('Y'),
            'genres_id' => 'required|array|min:1',
            'genres_id.*' => 'exists:genres,id',
            'country' => 'nullable|string|max:255',
        ]);

        $band = Band::create([
            'name' => $validated['name'],
            'formed_year' => $validated['formed_year'],
            'country' => $validated['country'] ?? 'Unknown',
            'rating' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Adjuntar los géneros a la banda
        $band->genres()->attach($validated['genres_id']);

        return redirect()->route('bands.index')
            ->with('success', 'Band created successfully!');
    }

}
