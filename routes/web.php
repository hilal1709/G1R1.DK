<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleMediaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventMediaController;
use App\Http\Controllers\VideoController;

use App\Http\Controllers\CommentController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;

use App\Http\Controllers\ReviewController;

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;


Route::get('/', function () {
    return view('landing');
})->name('home');

Route::get('/damar-kurung', function () {
    return Inertia::render('damar-kurung');
})->name('damar-kurung');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware('auth','role:admin' )->group(function() {
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

});

Route::middleware(['auth','role:member'])->group(function () {
    Route::resource('comments', CommentController::class);
    Route::resource('reviews', ReviewController::class);
    Route::resource('carts',CartController::class);
    Route::resource('cartItems', CartItemController::class);
});

Route::middleware(['auth','role:member,admin'])->group(function () {
    //belom kepikiran
});

Route::resource('articles', ArticleController::class)->only(['index','show']);
Route::resource('events', EventController::class)->only(['index','show']);
Route::resource('videos', VideoController::class)->only(['index','show']);

Route::resource('products', ProductController::class)->only(['index','show']);
Route::resource('categories', CategoryController::class)->only(['index','show']);

// Google Auth Routes
Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

// Form view
Route::get('/login-admin', [AuthController::class, 'showLoginForm']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::post('/logout', function () {
    auth()->logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/'); // halaman landing
})->name('logout');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
