<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Event;
use App\Models\Article;

class HomeController extends Controller
{
    public function index()
    {
        // Ambil produk terbaru (6 produk)
        $products = Product::where('stock', '>', 0)
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'image' => $product->image ? asset('storage/' . $product->image) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f59e0b" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EProduk%3C/text%3E%3C/svg%3E',
                    'stock' => $product->stock,
                    'category' => $product->category,
                ];
            });

        // Ambil event mendatang (3 event)
        $events = Event::where('date', '>=', now())
            ->orderBy('date', 'asc')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'date' => $event->date,
                    'time' => $event->time,
                    'location' => $event->location,
                    'image' => $event->image ? asset('storage/' . $event->image) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2334d399" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EEvent%3C/text%3E%3C/svg%3E',
                    'max_participants' => $event->max_participants,
                    'current_participants' => $event->current_participants,
                ];
            });

        // Ambil artikel terbaru (3 artikel)
        $articles = Article::where('is_published', true)
            ->whereNotNull('published_at')
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'excerpt' => $article->excerpt,
                    'content' => substr(strip_tags($article->content), 0, 150) . '...',
                    'image' => $article->image ? asset('storage/' . $article->image) : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%236366f1" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EArtikel%3C/text%3E%3C/svg%3E',
                    'published_at' => $article->published_at ? $article->published_at->format('d M Y') : null,
                    'author' => $article->author ?? 'Admin',
                ];
            });

        return Inertia::render('home', [
            'products' => $products,
            'events' => $events,
            'articles' => $articles,
        ]);
    }
}
