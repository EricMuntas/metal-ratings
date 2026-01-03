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

    public function showRelease($band, $release, Request $request)
    {

        // release -> obtén la release y adjunta los datos de la banda -> busca el release por ID
        $release = Release::with(['bands', 'songs'])->find($release);

        return Inertia::render("Bands/ShowRelease", ([
            // 'band' => $band,
            'release' => $release,
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
            'songs' => 'array|required',
            'songs.*.title' => 'required|string|max:255',
            'songs.*.duration' => 'required|string',
            'songs.*.lyrics' => 'nullable|string',
        ]);

        $release = Release::create([
            'name' => $validated['name'],
            // 'band_id' => json_encode($validated['band_id']),
            'release_date' => $validated['release_date'],
            'type' => $validated['type'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $release->bands()->attach($id);

        // Crear las canciones
        if (!empty($validated['songs'])) {
            foreach ($validated['songs'] as $songData) {
                $song = Song::create([
                    'title' => $songData['title'],
                    'duration' => $songData['duration'],
                    'lyrics' => $songData['lyrics'] ?? '',
                    'created_at' => now(),
                    'updated_at' => now(),
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
