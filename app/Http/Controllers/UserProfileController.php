<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\ReleaseReview;
use App\Models\SongReview;
use App\Models\User;
use Illuminate\Http\Request;
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

        $userSongReviews = SongReview::where('user_id', $id)->get();

        return Inertia::render('User/UserProfile', [

            'user' => $user,
            'releaseReviews' => $userReleaseReviews,
            'songReviews' => $userSongReviews,

        ]);
    }

    public function showEditProfile($id)
    {

        $user = User::find($id);

        return Inertia::render('User/EditUserProfile', [

            'user' => $user,
            'genres' => Genre::all(),

        ]);
    }
}
