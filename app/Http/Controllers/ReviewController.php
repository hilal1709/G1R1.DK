<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    protected $user;

    

    // Create review
    public function store(Request $request)
    {
        $request->validate([
            'rating'      => 'required|integer|min:1|max:5',
            'komentar'      => 'required|string|max:1000',
            'product_id'  => 'required|exists:products,id',
            'media' => 'required|file|mimes:jpg,jpeg,png,mp4,mov',
        ]);

        // Cek apakah user sudah pernah review product ini
        $existing = Review::where('product_id', $request->product_id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existing) {
            return back()->withErrors('Anda sudah membuat ulasan untuk produk ini.');
        }

        $review = new Review();
        $review->user_id   = auth()->id();
        $review->product_id = $request->product_id;
        $review->rating    = $request->rating;
        $review->komentar    = $request->komentar;
        $review->save();

        // Jika ada media (gambar/video) yang di-upload
        if ($request->hasFile('media')) {
            // Upload media
            $path = $request->file('media')->store('uploads/review_media', 'public');

            // Simpan informasi media terkait review
            ReviewMedia::create([
                'review_id'  => $review->id, // Menghubungkan media ke review
                'file_path'  => '/storage/' . $path,
                'media_type' => $request->file('media')->getClientMimeType(),
            ]);
        }

        return back()->with('success', 'Review berhasil ditambahkan!');
    }

    // Update review (pakai JSON seperti punya kamu)
    public function update(Request $request, Review $review)
    {
        $request->validate([
            'komentar' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
            'media'      => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov',
        ]);

        if (auth()->id() !== $review->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk edit review ini.');
        }

        $review->komentar = $request->komentar;
        $review->rating = $request->rating;
        $review->save();

        // Jika ada file baru yang diupload
    if ($request->hasFile('files')) {
        foreach ($request->file('files') as $file) {
            // Upload media baru
            $path = $file->store('uploads/reviewmedia', 'public');
            // Simpan file media baru di database
            ReviewMedia::create([
                'review_id' => $review->id,
                'file_path' => '/storage/' . $path,
                'media_type' => $file->getClientMimeType(),
            ]);
        }
    }

    // Jika ada media yang ingin diganti
    if ($request->has('replace_files')) {
        foreach ($request->replace_files as $mediaId => $file) {
            $media = ReviewMedia::find($mediaId);
            if ($media && $file) {
                // Hapus media lama dari storage
                Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));

                // Upload media baru
                $path = $file->store('uploads/reviewmedia', 'public');

                // Update path media yang lama
                $media->update(['file_path' => '/storage/' . $path]);
            }
        }
    }

    // Hapus media yang dipilih
    if ($request->has('delete_media')) {
        foreach ($request->delete_media as $mediaId) {
            $media = ReviewMedia::find($mediaId);
            if ($media) {
                // Hapus file lama dari storage
                Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));

                // Hapus data media dari database
                $media->delete();
            }
        }
    }

        return response()->json(['success' => true]);
    }


    // Hapus review
    public function destroy(Review $review)
    {
        if (auth()->id() !== $review->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk menghapus review ini.');
        }

        // Hapus media terkait review jika ada
        if ($review->media) {
            // Hapus file dari storage
            Storage::disk('public')->delete(str_replace('/storage/', '', $review->media->file_path));

            // Hapus data media
            $review->media->delete();
        }

        $review->delete();
        return back()->with('success', 'Review berhasil dihapus!');
    }
}
