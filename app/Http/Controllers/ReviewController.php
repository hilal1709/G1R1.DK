<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Check if user already reviewed this product
        $userId = Auth::id();
        $existingReview = Review::where('user_id', $userId)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($existingReview) {
            return back()->with('error', 'Anda sudah memberikan review untuk produk ini');
        }

        // Handle image uploads
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imagePaths[] = $path;
            }
        }

        Review::create([
            'user_id' => $userId,
            'product_id' => $validated['product_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'images' => $imagePaths,
            'is_approved' => false, // Admin approval required
        ]);

        // Update product rating
        $this->updateProductRating($validated['product_id']);

        return back()->with('success', 'Review berhasil dikirim! Menunggu persetujuan admin.');
    }

    public function update(Request $request, Review $review)
    {
        // Check ownership
        $userId = Auth::id();
        if ($review->user_id !== $userId) {
            abort(403);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle new image uploads
        $imagePaths = $review->images ?? [];
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($imagePaths as $oldPath) {
                Storage::disk('public')->delete($oldPath);
            }

            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $imagePaths[] = $path;
            }
        }

        $review->update([
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'images' => $imagePaths,
            'is_approved' => false, // Require re-approval
        ]);

        // Update product rating
        $this->updateProductRating($review->product_id);

        return back()->with('success', 'Review berhasil diupdate!');
    }

    public function destroy(Review $review)
    {
        // Check ownership
        $userId = Auth::id();
        if ($review->user_id !== $userId) {
            abort(403);
        }

        // Delete images
        if ($review->images) {
            foreach ($review->images as $imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $productId = $review->product_id;
        $review->delete();

        // Update product rating
        $this->updateProductRating($productId);

        return back()->with('success', 'Review berhasil dihapus!');
    }

    public function approve(Review $review)
    {
        $review->update(['is_approved' => true]);

        return back()->with('success', 'Review berhasil disetujui!');
    }

    public function reject(Review $review)
    {
        // Delete images
        if ($review->images) {
            foreach ($review->images as $imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
        }

        $productId = $review->product_id;
        $review->delete();

        // Update product rating
        $this->updateProductRating($productId);

        return back()->with('success', 'Review berhasil ditolak dan dihapus!');
    }

    private function updateProductRating($productId)
    {
        $product = Product::findOrFail($productId);

        $approvedReviews = Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->get();

        if ($approvedReviews->count() > 0) {
            $averageRating = $approvedReviews->avg('rating');
            $product->update([
                'rating' => round($averageRating, 1),
                'total_reviews' => $approvedReviews->count(),
            ]);
        } else {
            $product->update([
                'rating' => 0,
                'total_reviews' => 0,
            ]);
        }
    }
}
