<?php

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

// Route::get('/', function () {
//     return view('welcome');
// });
