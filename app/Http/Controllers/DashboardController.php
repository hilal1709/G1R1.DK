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
            'active_events' => Event::active()->count(),
        ];

        // Artikel terbaru (3 artikel)
        $recentArticles = Article::with(['user', 'articleMedias'])
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'judul' => $article->judul,
                    'excerpt' => \Illuminate\Support\Str::limit(strip_tags($article->isi), 100),
                    'author' => $article->user?->name ?? 'Admin',
                    
                    'image' => $article->articleMedias->first()
                        ? asset($article->articleMedias->first()->file_path)
                        : '/images/article-placeholder.jpg',
                    'date' => $article->created_at->diffForHumans(),
                ];
            });

        // Event mendatang (3 event)
        $upcomingEvents = Event::with(['eventMedias'])
            ->withCount('registrations')
            ->upcoming()
            ->orderBy('tanggal_mulai', 'asc')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'nama' => $event->nama,
                    'tanggal_mulai' => $event->tanggal_mulai->format('d M Y H:i'),
                    'tanggal_selesai' => $event->tanggal_selesai->format('d M Y H:i'),
                    'registered_participants' => $event->registered_participants,
                    'max_pendaftar' => $event->max_pendaftar,
                    'image' => $event->eventMedias->first()
                        ? asset( $event->eventMedias->first()->file_path)
                        : '/images/event-placeholder.jpg',
                ];
            });

        // Produk unggulan (3 produk)
        $featuredProducts = Product::with('images')
            ->where('stok', '>', 0)
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama' => $product->nama,
                    'harga' => $product->harga,
                    'stok' => $product->stok,
                    'image' => $product->images->first()
                    ? asset($product->images->first()->gambar)
                    : '/images/product-placeholder.jpg',
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
