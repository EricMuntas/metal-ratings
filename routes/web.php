<?php

use App\Http\Controllers\BandController;
use App\Http\Controllers\GenreController;
use App\Models\Band;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {

    return Inertia::render('Welcome', [
        'name' => 'Mundo'
    ]);
});

Route::get('/test', function () {
    return Inertia::render('Welcome', [
        'name' => 'Test'
    ]);
});

Route::get('/bands', [BandController::class, 'index'])->name('bands.index');
Route::get('/bands/{id}', [BandController::class, 'show'])->name('bands.show');
Route::get('/add-band', [BandController::class, 'showAddBandForm']);
Route::post('/add-band', [BandController::class, 'createBand'])->name('bands.storeBand');


Route::get('/bands/{id}/add-release', [BandController::class, 'showAddReleaseForm']);
Route::post('/bands/{id}/add-release', [BandController::class, 'createRelease'])->name('bands.storeRelease');

Route::get('/add-genre', [GenreController::class, 'showAddGenreForm'])->name('genre.showAddGenreForm');
Route::post('/add-genre', [GenreController::class, 'store'])->name('genre.store');
// Route::get('/', function () {
//     return view('welcome');
// });
