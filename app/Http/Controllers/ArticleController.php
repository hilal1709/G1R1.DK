<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\ArticleMedia;

class ArticleController extends Controller
{
    protected $user;

    public function index()
    {
        
        $articles = Article::with('articleMedias', 'comments.user')->get();
        return view('articles.index', compact('articles'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:200',
            'isi' => 'nullable|string',
            'files.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov', // validasi file
            'jenis.*' => 'required|string',
        ]);

        $article = Article::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'user_id' => auth()->id(),          // otomatis ID user login
        ]);

        if($request->hasFile('files')) {
            foreach($request->file('files') as $index => $file) {
                $path = $file->store('uploads', 'public'); // simpan di storage/app/public/uploads
                $article->articleMedias()->create([
                    'file_path' => '/storage/'.$path, // path untuk diakses browser
                    'jenis' => $request->jenis[$index],
                ]);
            }
        }

        return redirect()->back()->with('success', 'Artikel berhasil dibuat!');
    }

    public function show(Article $article)
    {
        $article->load('articleMedias', 'comments.user'); // tetap load relasi
        return view('articles.show', compact('article')); // arahkan ke view
    }

    public function update(Request $request, Article $article)
    {
        $request->validate([
            'judul' => 'required|string|max:200',
            'isi' => 'nullable|string',
            'files.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov',
            'jenis.*' => 'required|string',
        ]);
        
        // Update artikel
        $article->update($request->only('judul','isi'));

        // Ganti media lama jika ada file baru
        if ($request->has('replace_files')) {
            foreach ($request->replace_files as $mediaId => $file) {
                $media = ArticleMedia::find($mediaId);
                if ($media && $file) {
                    // Hapus file lama
                    \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));

                    // Simpan file baru
                    $path = $file->store('uploads', 'public');
                    $media->update([
                        'file_path' => '/storage/' . $path,
                    ]);
                }
            }
        }

        // --- Hapus media lama yang dicentang ---
        if($request->has('delete_media')) {
            foreach($request->delete_media as $mediaId) {
                $media = ArticleMedia::find($mediaId);
                if($media) {
                    // Hapus file lama di storage
                    \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
                    // Hapus record
                    $media->delete();
                }
            }
        }

        // Tambah media baru jika ada
        if($request->hasFile('files')) {
            foreach($request->file('files') as $index => $file) {
                $path = $file->store('uploads', 'public'); // simpan di storage/app/public/uploads
                $article->articleMedias()->create([
                    'file_path' => '/storage/'.$path, // path untuk diakses browser
                    'jenis' => $request->jenis[$index],
                ]);
            }
        }

        return redirect()->back()->with('success', 'Artikel berhasil diupdate!');
    }

    public function destroy(Article $article)
    {
        // Hapus semua media terkait artikel
        foreach ($article->articleMedias as $media) {
            // Hapus file fisik di storage
            \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
            // Hapus record media
            $media->delete();
        }

        // Hapus artikel
        $article->delete();

        return redirect()->route('articles.index')
                        ->with('success', 'Artikel berhasil dihapus!');
    }

    public function create()
    {
        return view('articles.create'); // blade view buat form
    }

    public function edit(Article $article)
    {
        return view('articles.edit', compact('article'));
    }
}
