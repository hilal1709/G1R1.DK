<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Article;
use App\Models\Event;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistik
        $stats = [
            'total_articles' => Article::count(),
            'total_events' => Event::count(),
            'total_products' => Product::count(),
            'total_users' => User::count(),
            'active_events' => Event::where('date', '>=', now())->count(),
        ];

        // Artikel terbaru (3 artikel)
        $recentArticles = Article::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt ?? substr(strip_tags($article->content), 0, 100) . '...',
                    'views' => 0, // Bisa ditambahkan field views di migration jika diperlukan
                    'date' => $article->published_at?->diffForHumans() ?? $article->created_at->diffForHumans(),
                ];
            });

        // Event mendatang (3 event)
        $upcomingEvents = Event::where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->start_date->format('d M Y'),
                    'participants' => $event->registered_participants,
                    'max_participants' => $event->max_participants,
                ];
            });

        // Produk unggulan (3 produk dengan stock terbanyak atau terbaru)
        $featuredProducts = Product::where('stock', '>', 0)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'sold' => 0, // Bisa ditambahkan field sold di migration jika diperlukan
                    'image' => $product->image ? asset('storage/' . $product->image) : null,
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentArticles' => $recentArticles,
            'upcomingEvents' => $upcomingEvents,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
