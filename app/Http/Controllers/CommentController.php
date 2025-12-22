<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    protected $user;

    // Create komentar
    public function store(Request $request)
    {
        $request->validate([
            'komentar' => 'required|string|min:500|max:2000',
            'article_id' => 'nullable|exists:articles,id',
            'event_id'   => 'nullable|exists:events,id',
            'video_id'   => 'nullable|exists:videos,id',
            'product_id' => 'nullable|exists:products,id',
        ]);

        // Validasi minimal 100 kata
        $wordCount = str_word_count($request->komentar);
        if ($wordCount < 100) {
            return redirect()->back()->withErrors([
                'komentar' => "Komentar harus minimal 100 kata. Saat ini: {$wordCount} kata."
            ]);
        }

        if (!$request->article_id && !$request->event_id && !$request->video_id && !$request->product_id) {
            return redirect()->back()->withErrors('Komentar harus terkait Article, Event, Video, atau Product!');
        }

        $comment = new Comment();
        $comment->user_id = Auth::id();
        $comment->komentar = $request->komentar;

        if ($request->article_id) {
            $comment->target_id = $request->article_id;
            $comment->target_type = 'App\Models\Article';
        }

        if ($request->event_id) {
            $comment->target_id = $request->event_id;
            $comment->target_type = 'App\Models\Event';
        }

        if ($request->video_id) {
            $comment->target_id = $request->video_id;
            $comment->target_type = 'App\Models\Video';
        }

        if ($request->product_id) {
            $comment->target_id = $request->product_id;
            $comment->target_type = 'App\Models\Product';
        }

        $comment->save();

        return redirect()->back()->with('success', 'Komentar berhasil ditambahkan!');
    }

    // Update komentar
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'komentar' => 'required|string|min:500|max:2000',
        ]);

        // Validasi minimal 100 kata
        $wordCount = str_word_count($request->komentar);
        if ($wordCount < 100) {
            return response()->json([
                'success' => false,
                'message' => "Komentar harus minimal 100 kata. Saat ini: {$wordCount} kata."
            ], 422);
        }

        if (Auth::id() !== $comment->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk edit komentar ini.');
        }

        $comment->komentar = $request->komentar;
        $comment->save();

        return response()->json(['success' => true]);
    }

    // Hapus komentar
    public function destroy(Comment $comment)
    {
        if (Auth::id() !== $comment->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk menghapus komentar ini.');
        }

        $comment->delete();
        return redirect()->back()->with('success', 'Komentar berhasil dihapus!');
    }

}
