<?php

use App\Http\Controllers\BandController;
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
Route::get('/bands/{id}', [BandController::class, 'show']);
Route::get('/add-band', [BandController::class, 'showAddBandForm']);
Route::post('/add-band', [BandController::class, 'create'])->name('bands.store');;

// Route::get('/', function () {
//     return view('welcome');
// });
