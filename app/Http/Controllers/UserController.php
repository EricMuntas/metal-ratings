<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    


public function likeBand($bandId, Request $request) {

    $band = Band::find($bandId);

   $band->users(Auth::id());



}
}
