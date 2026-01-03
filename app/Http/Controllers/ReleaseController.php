<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Release;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReleaseController extends Controller
{
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
            'songs' => 'array',
            'songs.*.title' => 'required|string|max:255',
            'songs.*.duration' => 'required|string',
            'songs.*.lyrics' => 'nullable|string',
        ]);

        $release = Release::create([
            'name' => $validated['name'],
            // 'band_id' => json_encode($validated['band_id']),
            'release_date' => $validated['release_date'],
            'type' => $validated['type'],
        ]);

        $release->bands()->attach($id);

        // Crear las canciones
        if (!empty($validated['songs'])) {
            foreach ($validated['songs'] as $songData) {
                $song = Song::create([
                    'title' => $songData['title'],
                    'duration' => $songData['duration'],
                    'lyrics' => $songData['lyrics'] ?? '',
                ]);
                $song->bands()->attach($id);
                $song->releases()->attach($release->id);
            }



        }

        // $release->save();

        //     return Inertia::render("Bands/AddBand", ([
        //     'genres' => \App\Models\Genre::all()
        // ]));
        return redirect()->route('bands.index')
            ->with('success', 'Band created successfully!');
    }
}
