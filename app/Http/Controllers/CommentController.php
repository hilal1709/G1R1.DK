<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;


class CommentController extends Controller
{
    protected $user;

    // Create komentar
    public function store(Request $request)
    {
        $request->validate([
            'komentar' => 'required|string|max:1000',
            'article_id' => 'nullable|exists:articles,id',
            'event_id'   => 'nullable|exists:events,id',
            'video_id'   => 'nullable|exists:videos,id',
        ]);

        if (!$request->article_id && !$request->event_id && !$request->video_id) {
            return redirect()->back()->withErrors('Komentar harus terkait Article atau Event!');
        }

        $comment = new Comment();
        $comment->user_id = auth()->id();
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

        $comment->save();

        return redirect()->back()->with('success', 'Komentar berhasil ditambahkan!');
    }

    // Update komentar
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'komentar' => 'required|string|max:1000',
        ]);

        if (auth()->id() !== $comment->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk edit komentar ini.');
        }

        $comment->komentar = $request->komentar;
        $comment->save();

        return response()->json(['success' => true]);
    }

    // Hapus komentar
    public function destroy(Comment $comment)
    {
        if (auth()->id() !== $comment->user_id) {
            return abort(403, 'Kamu tidak punya izin untuk menghapus komentar ini.');
        }

        $comment->delete();
        return redirect()->back()->with('success', 'Komentar berhasil dihapus!');
    }

}
