<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Models\Genre;
use App\Models\Release;
use App\Models\ReleaseReview;
use App\Models\Song;
use App\Models\SongReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ReleaseController extends Controller
{

    public function showRelease($band, $release, Request $request)
    {

        // release -> obtén la release y adjunta los datos de la banda -> busca el release por ID
        $release = Release::with([
            'bands',
            'songs',
        ])->find($release);

        // Obtener las IDs de las canciones del release
        $songIds = $release->songs->pluck('id');

        // Obtener las reviews del usuario actual para esas canciones
        $myReviews = SongReview::where('user_id', Auth::id())
            ->whereIn('song_id', $songIds)
            ->get()
            ->keyBy('song_id');

        return Inertia::render("Bands/ShowRelease", ([
            // 'band' => $band,
            'release' => $release,
            'myReviews' => $myReviews,
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
            'genres' => Genre::all(),
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
            'genres_id' => 'required|array|min:1',
            'genres_id.*' => 'exists:genres,id',
            'main_photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('main_photo')) {
            $path = $request->file('main_photo')->store('bands', 'public');
        }

        $release = Release::create([
            'name' => $validated['name'],
            'main_photo' => $path,
            'release_date' => $validated['release_date'],
            'type' => $validated['type'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $release->bands()->attach($id);

        $release->genres()->attach($validated['genres_id']);

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
        return redirect()->route('band.index')
            ->with('success', 'Band created successfully!');
    }

    public function showReleaseReviews($band_id, $release_id)
    {

        $release = Release::with(['bands'])->find($release_id);

        $reviews = ReleaseReview::where('release_id', $release_id)->get();

        return Inertia::render('Bands/ShowReleaseReviews', [
            'release' => $release,
            'reviews' => $reviews,
        ]);
    }
}
