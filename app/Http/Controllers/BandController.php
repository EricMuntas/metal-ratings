<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Release;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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

        $band = Band::with('releases')->findOrFail($id);

        return Inertia::render('Bands/ShowBand', [
            'band' => $band,
            'releases' => $band->releases,
        ]);
    }


    public function showAddBandForm(Request $request)
    {
        return Inertia::render("Bands/AddBand", ([
            'genres' => \App\Models\Genre::all()
        ]));
    }

    public function showAddReleaseForm($id, Request $request)
    {

        $band = Band::find($id);

        $releaseTypes = [
            'LP',
            'EP',
            'Single',
            'Split',
            'Compilation',
            'Demo',
        ];

        return Inertia::render("Bands/AddRelease", ([
            'band' => $band,
            'release_types' => $releaseTypes,
        ]));
    }

    public function createRelease($id, Request $request)
    {

        // 'band_id' => 'required|integer',

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'release_date' => 'required',
            'type' => ['required', Rule::in(Release::RELEASE_TYPES)],
        ]);

        $release = Release::create([
            'name' => $validated['name'],
            // 'band_id' => json_encode($validated['band_id']),
            'band_id' => $id,
            'release_date' => $validated['release_date'],
            'type' => $validated['type'],
        ]);

        $release->bands()->attach($id);

        // $release->save();

        //     return Inertia::render("Bands/AddBand", ([
        //     'genres' => \App\Models\Genre::all()
        // ]));
        return redirect()->route('bands.index')
            ->with('success', 'Band created successfully!');
    }

    public function createBand(Request $request)
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
