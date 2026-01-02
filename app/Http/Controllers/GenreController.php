<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenreController extends Controller
{
    //
    public function showAddGenreForm()
    {

        return Inertia::render('Genres/AddGenre', [

        ]);

    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre = Genre::create([
            'name' => $validated['name'],
        ]);

        return redirect()->route('bands.index')
            ->with('success', 'Genre created successfully!');

    }


}
