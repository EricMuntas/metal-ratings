<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\SongReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SongController extends Controller
{
    //

    public function showSong($id)
    {


        $song = Song::with(['bands', 'releases'])->find($id);

        $isLiked = Auth::check()
            ? $song->users()->where('user_id', Auth::id())->exists()
            : false;


        return Inertia::render('Bands/ShowSong', [
            'song' => $song,
            'isLiked' => $isLiked,
            'likesCount' => $song->users()->count(),
        ]);
    }
    public function showSongReviews($id)
    {

        $song = Song::with(['bands', 'releases'])->find($id);

        $reviews = SongReview::where('song_id', $id)->get();

        return Inertia::render('Bands/ShowSongReviews', [
            'song' => $song,
            'reviews' => $reviews,
        ]);
    }

    public function toggleLike(Request $request, $id)
    {
        $song = Song::findOrFail($id);
        $song->users()->toggle(Auth::id());

        $liked = $song->users()->where('user_id', Auth::id())->exists();

        return back()->with('liked', $liked);
    }
}
