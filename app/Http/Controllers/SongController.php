<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\SongReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SongController extends Controller
{
    //

    public function showSong($id) {


        $song = Song::with(['bands', 'releases'])->find($id);

        return Inertia::render('Bands/ShowSong', [
            'song' => $song,
        ]);

    }
    public function showSongReviews($id) {

        $song = Song::with(['bands', 'releases'])->find($id);

        $reviews = SongReview::where('song_id', $id)->get();

        return Inertia::render('Bands/ShowSongReviews', [
            'song' => $song,
            'reviews' => $reviews,
        ]);

    }


}
