<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\SongReview;
use Auth;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function storeSongReview(Request $request) {

        $validated = $request->validate([
            'rating' => 'required|integer|min:0|max:10',
            'review' => 'nullable|string|max:5000',
            'song_id' => 'required|integer',
        ]);

        // $songToReview = Song::find($id);

        $songReview = SongReview::create([
            'rating' => $validated['rating'],
            'review' => $validated['review'] ?? null,
            // 'user_id' => Auth::id(),
            // 'user_id' => 1,
            // 'user_id' => null,
            'song_id' => $validated['song_id'],
        ]);

           return redirect()->back()->with('success', 'Review created successfully');
       

    }
}
