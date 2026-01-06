<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BandController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ReleaseController;
use App\Http\Controllers\ReviewController;
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


Route::get('/bands/{id}/add-release', [ReleaseController::class, 'showAddReleaseForm']);
Route::post('/bands/{id}/add-release', [ReleaseController::class, 'createRelease'])->name('release.storeRelease');
Route::get('/bands/{band}/{release}', [ReleaseController::class, 'showRelease'])->name('release.show');


Route::get('/add-genre', [GenreController::class, 'showAddGenreForm'])->name('genre.showAddGenreForm');
Route::post('/add-genre', [GenreController::class, 'store'])->name('genre.store');

Route::post('/add-song-review', [ReviewController::class, 'storeSongReview'])->name('review.storeSongReview');
Route::delete('/{id}/delete-song-review', [ReviewController::class, 'destroySongReview'])->name('review.destroySongReview');

Route::post('/add-release-review', [ReviewController::class, 'storeReleaseReview'])->name('review.storeReleaseReview');
Route::delete('/{id}/delete-release-review', [ReviewController::class, 'destroyReleaseReview'])->name('review.destroyReleaseReview');
// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    
    Route::post('/login', [LoginController::class, 'store']);
    
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
    
    Route::post('/register', [RegisterController::class, 'store']);
});

// Rutas protegidas
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});

// Ruta principal
Route::get('/', function () {
    return redirect()->route('dashboard');
});
