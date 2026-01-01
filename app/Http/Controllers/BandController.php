<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BandController extends Controller
{
    //

    public function index()
    {

        $all_bands = Band::all();

        return Inertia::render("Bands/Bands", ([
            'bands' => $all_bands,
        ]));
    }


    public function show($id)
    {

        $band = Band::find($id);

        return Inertia::render("Bands/BandProfile", ([
            'band' => $band,
        ]));
    }


    public function showAddBandForm(Request $request)
    {
        return Inertia::render("Bands/AddBand", ([

        ]));
    }




public function create(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'formed_year' => 'required|integer|min:1900|max:' . date('Y'),
        'genres_id' => 'required|array',
    ]);

    $band = Band::create([
        'name' => $validated['name'],
        'formed_year' => $validated['formed_year'],
        'genres_id' => json_encode($validated['genres_id']),
    ]);

    return redirect()->route('bands.index')
        ->with('success', 'Band created successfully!');
}

}
