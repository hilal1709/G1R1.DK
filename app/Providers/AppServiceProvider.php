<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Models\Event;
use App\Models\Product;
use Illuminate\Support\Facades\URL;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Route model binding untuk Event menggunakan slug
        //Route::bind('event', function ($value) {
       //     return Event::where('slug', $value)->firstOrFail();
        //});

        // Route model binding untuk Product menggunakan slug
        //Route::bind('product', function ($value) {
      //     return Product::where('slug', $value)->firstOrFail();
       // });
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
