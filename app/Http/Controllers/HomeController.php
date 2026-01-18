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
         // Produk terbaru (6)
        $products = Product::with(['category', 'images'])
            ->where('stok', '>', 0)
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama' => $product->nama,
                    'deskripsi' => $product->deskripsi,
                    'harga' => $product->harga,
                    'stok' => $product->stok,
                    'category' => $product->category?->nama,
                    'image' => $product->images->first()?->gambar ?? '/images/product-placeholder.jpg',
                ];
            });

        // Ambil event mendatang (3 event)
        $events = Event::with(['eventMedias'])
            ->withCount('registrations') // supaya registered_participants efisien
            ->upcoming()
            ->orderBy('tanggal_mulai', 'asc')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'nama' => $event->nama,
                    'deskripsi' => $event->deskripsi,
                    'lokasi' => $event->lokasi,
                    'tanggal_mulai' => $event->tanggal_mulai->format('d M Y H:i'),
                    'tanggal_selesai' => $event->tanggal_selesai->format('d M Y H:i'),

                    'max_pendaftar' => $event->max_pendaftar,

                    // INI DARI RELASI (BENAR)
                    'registered_participants' => $event->registered_participants,

                    'image' => $event->eventMedias->first()?->file_path ?? '/images/event-placeholder.jpg',
                ];
            });

        // Ambil artikel terbaru (3 artikel)
        $articles = Article::with(['user', 'articleMedias'])
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'judul' => $article->judul,

                    // ringkasan dari isi
                    'excerpt' => \Illuminate\Support\Str::limit(
                        strip_tags($article->isi),
                        150
                    ),

                    'author' => $article->user?->name ?? 'Admin',

                    'image' => $article->articleMedias->first()
                        ? asset('storage/' . $article->articleMedias->first()->path)
                        : '/images/article-placeholder.jpg',
                ];
            });

        return Inertia::render('home', [
            'products' => $products,
            'events' => $events,
            'articles' => $articles,
        ]);
    }
}
