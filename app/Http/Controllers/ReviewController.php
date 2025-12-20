<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

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

        return back()->with('success', 'Review berhasil ditambahkan!');
    }

    // Update review (pakai JSON seperti punya kamu)
    public function update(Request $request, Review $review)
    {
        $request->validate([
            'komentar' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        if (auth()->id() !== $review->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk edit review ini.');
        }

        $review->komentar = $request->komentar;
        $review->rating = $request->rating;
        $review->save();

        return response()->json(['success' => true]);
    }


    // Hapus review
    public function destroy(Review $review)
    {
        if (auth()->id() !== $review->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk menghapus review ini.');
        }

        $review->delete();
        return back()->with('success', 'Review berhasil dihapus!');
    }
}
