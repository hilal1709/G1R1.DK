<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReviewMedia;
use App\Models\Review;

class ReviewMediaController extends Controller
{
    /**
     * Simpan media baru
     */
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $request->validate([
            'review_id' => 'required|exists:reviews,id',
            'media_url' => 'required|string',
            'media_type' => 'required|string', // Misalnya image, video, dll.
        ]);

        // Membuat media baru
        $media = ReviewMedia::create($request->only(['review_id', 'media_url', 'media_type']));

        // Mengambil data media beserta relasi review
        return $media->load('review');
    }

    /**
     * Update media
     */
    public function update(Request $request, ReviewMedia $reviewMedia)
    {
        // Validasi data yang diterima
        $request->validate([
            'media_url' => 'sometimes|required|string',
            'media_type' => 'sometimes|required|string',
        ]);

        // Mengupdate data media
        $reviewMedia->update($request->only(['media_url', 'media_type']));

        // Mengambil data media beserta relasi review
        return $reviewMedia->load('review');
    }

    /**
     * Hapus media
     */
    public function destroy(ReviewMedia $reviewMedia)
    {
        // Menghapus media
        $reviewMedia->delete();

        // Mengembalikan response sukses
        return response()->json(['message' => 'Media berhasil dihapus']);
    }
}
