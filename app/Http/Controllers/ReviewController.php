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

    $songReview = SongReview::updateOrCreate(
        [
            'user_id' => Auth::id(),
            'song_id' => $validated['song_id']
        ],
        [
            'rating' => $validated['rating'],
            'review' => $validated['review'] ?? null,
        ]
    );

    return redirect()->back()->with('success', 'Review saved successfully');
}

public function destroySongReview($id) {

    $review = SongReview::destroy($id);

    return redirect()->back()->with('success', 'Review deleted successfully');
}
}
