<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\ReleaseReview;
use App\Models\Song;
use App\Models\Band;
use App\Models\SongReview;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    //
    public function show($id)
    {

        $user = User::find($id);

        $userReleaseReviews = ReleaseReview::where('user_id', $id)
            ->with(['release.bands:id,name'])
            ->get();

        // $userSongReviews = SongReview::where('user_id', $id)->with(['release.bands:id,name'])->get();
        $userSongReviews = SongReview::where('user_id', $id)
            ->with([
                'song:id,title,duration,rating', // campos que necesitas de song
                'song.bands',            // bands relacionadas con la song
                'song.releases:id,name,type,release_date' // releases relacionadas con la song
            ])
            ->get();


        $userLikedBands = $user->likedBands()->with('genres')->get();

        $userLikedReleases = $user->likedReleases()->with('genres')->get();

        $userLikedSongs = $user->likedSongs()->with('bands')->get();

        return Inertia::render('User/UserProfile', [

            'user' => $user,
            'releaseReviews' => $userReleaseReviews,
            'songReviews' => $userSongReviews,
            'likedBands' => $userLikedBands,
            'likedReleases' => $userLikedReleases,
            'likedSongs' => $userLikedSongs,

        ]);
    }

    public function showEditProfile($id)
    {

        $user = User::find($id);

        return Inertia::render('User/EditUserProfile', [

            'user' => $user,

        ]);
    }
    public function saveEditProfile($id, Request $request)
    {
        $validated = $request->validate([
            'description'      => 'nullable|string|max:2000',
            'favourite_bands'  => 'nullable|string|max:100',
            'favourite_genres' => 'nullable|string|max:100',
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $path = null;

        if ($request->hasFile('profile_pic')) {

            $path = $request->file('profile_pic')->store('users', 'public');
            // saves as -> users/s4CLZIfpNDUuAvNfUsn5YhEZiJttQpP5233kBsBs.jpg
        }

        $user = User::find(Auth::id());

        $user->update([
            'description'      => $validated['description'] ?: null,
            'favourite_bands'  => $validated['favourite_bands'] ?: null,
            'favourite_genres' => $validated['favourite_genres'] ?: null,
            'profile_pic' => $path ?: null,
        ]);

        return redirect('/users/' . $user->id);
    }
}
