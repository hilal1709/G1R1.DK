<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

<<<<<<< HEAD
Route::get('/damar-kurung', function () {
    return Inertia::render('damar-kurung');
})->name('damar-kurung');

=======
>>>>>>> origin/main
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

<<<<<<< HEAD
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
=======
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
>>>>>>> origin/main
