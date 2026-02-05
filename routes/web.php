<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleMediaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventMediaController;
use App\Http\Controllers\EventRegistrationController;
use App\Http\Controllers\VideoController;

use App\Http\Controllers\CommentController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;

use App\Http\Controllers\ReviewController;

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\GameDesignController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::middleware(['auth','role:admin'])->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/register-admin', [AuthController::class, 'showRegisterForm']);
    Route::post('/register-admin', [AuthController::class, 'registerAdmin']);

    Route::resource('articles', ArticleController::class);
    Route::resource('article-medias', ArticleMediaController::class);

    route::resource('events', EventController::class);
    route::resource('event-medias', EventMediaController::class);

    route::resource('videos', VideoController::class);

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('product-images', ProductImageController::class);

    Route::resource('comments', CommentController::class);
    Route::resource('reviews', ReviewController::class);

    // Game Designs
    Route::resource('game-designs', GameDesignController::class);
});

Route::middleware(['auth','role:member'])->group(function () {


    Route::resource('carts',CartController::class);
    Route::resource('cartItems', CartItemController::class);
});

Route::middleware(['auth','role:member,admin'])->group(function () {
    //belom kepikiran
    Route::post('/events/{event}/registration', [EventRegistrationController::class, 'store'])
    ->name('events.registration.store');

    // Cancel pendaftaran (DELETE /events/{event}/registration)
    Route::delete('/events/{event}/registration', [EventRegistrationController::class, 'destroy'])
    ->name('events.registration.destroy');
});

Route::get('/', [HomeController::class, 'index'])->name('home');

// Contact and About pages
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

// Games
Route::get('/games', function () {
    return redirect('/games/mewarnai');
})->name('games.index');
Route::get('/games/mewarnai', function () {
    $designs = App\Models\GameDesign::where('is_active', true)
        ->orderBy('level')
        ->get();
    return Inertia::render('Games/Mewarnai', ['designs' => $designs]);
})->name('games.mewarnai');
Route::get('/games/animasi', function () {
    return Inertia::render('Games/Animasi');
})->name('games.animasi');

Route::resource('articles', ArticleController::class)->only(['index','show']);
Route::resource('events', EventController::class)->only(['index','show']);
Route::resource('videos', VideoController::class)->only(['index','show']);

Route::resource('products', ProductController::class)->only(['index','show']);
Route::resource('categories', CategoryController::class)->only(['index','show']);

// API endpoint untuk real-time stock update
Route::get('/api/products/{product}/stock', [ProductController::class, 'getStock'])->name('products.stock');

// Google Auth Routes
Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

// Form view
Route::get('/login-admin', [AuthController::class, 'showLoginForm']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/'); // halaman landing
})->name('logout');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
