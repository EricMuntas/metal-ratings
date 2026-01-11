<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Genre;
use App\Models\Release;
use App\Models\ReleaseReview;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Storage;

class BandController extends Controller
{
    //

    public function index()
    {

        // $all_bands = Band::all();
        $all_bands = Band::with('genres')->get();

        return Inertia::render("Bands/Bands", ([
            'bands' => $all_bands,
            'genres' => Genre::all(),
        ]));
    }


    public function show($id)
    {

        $band = Band::with('releases')->findOrFail($id);

        $band_genres = Band::with('genres');

        $releasesIds = $band->releases->pluck('id');

        $myReviews = ReleaseReview::where('user_id', auth()->id())
            ->whereIn('release_id', $releasesIds)
            ->get()
            ->keyBy('release_id');

        return Inertia::render('Bands/ShowBand', [
            'band' => $band,
            'releases' => $band->releases,
            'band_genres' => $band_genres,
            'myReviews' => $myReviews,
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
            'main_photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('main_photo')) {

            $path = $request->file('main_photo')->store('bands', 'public');

        }

        $band = Band::create([
            'name' => $validated['name'],
            'formed_year' => $validated['formed_year'],
            'country' => $validated['country'] ?? 'Unknown',
            'rating' => null,
            'main_photo' => $path,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $band->genres()->attach($validated['genres_id']);

        return redirect()->route('band.index')
            ->with('success', 'Band created successfully!');
    }

}
