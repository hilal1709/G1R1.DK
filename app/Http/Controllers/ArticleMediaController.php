<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ArticleMedia;
use App\Models\Article;

class ArticleMediaController extends Controller
{

    /**
     * Simpan media baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'article_id' => 'required|exists:articles,id',
            'file_path' => 'required|string',
            'jenis' => 'required|string',
        ]);

        $media = ArticleMedia::create($request->only(['article_id','file_path','jenis']));

        return $media->load('article');
    }

    /**
     * Update media
     */
    public function update(Request $request, ArticleMedia $articleMedia)
    {
        $request->validate([
            'file_path' => 'sometimes|required|string',
            'jenis' => 'sometimes|required|string',
        ]);

        $articleMedia->update($request->only(['file_path','jenis']));

        return $articleMedia->load('article');
    }

    /**
     * Hapus media
     */
    public function destroy(ArticleMedia $articleMedia)
    {
        $articleMedia->delete();
        return response()->json(['message' => 'Media berhasil dihapus']);
    }
}
