<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class VideoController extends Controller
{
    protected $user;

    /**
     * Tampilkan semua video
     */
    public function index()
    {
        $videos = Video::with('user')->get();
        return view('videos.index', compact('videos'));
    }

    /**
     * Form create video
     */
    public function create()
    {
        return view('videos.create');
    }

    /**
     * Simpan video baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:200',
            'deskripsi' => 'nullable|string',
            'file_path' => 'required|file|mimes:mp4,mov,avi',
            'lokasi' => 'nullable|string|max:150',
        ]);

        // Upload file
        $path = $request->file('file_path')->store('uploads/videos', 'public');

        $video = Video::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'file_path' => '/storage/' . $path,
            'lokasi' => $request->lokasi,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('videos.show', $video->id)
                        ->with('success', 'Video berhasil dibuat!');
    }

    /**
     * Tampilkan satu video
     */
    public function show(Video $video)
    {
        $video->load('user', 'comments.user');
        return view('videos.show', compact('video'));
    }

    /**
     * Form edit video
     */
    public function edit(Video $video)
    {
        return view('videos.edit', compact('video'));
    }

    /**
     * Update video
     */
    public function update(Request $request, Video $video)
    {
        $request->validate([
            'judul' => 'required|string|max:200',
            'deskripsi' => 'nullable|string',
            'file_path' => 'nullable|file|mimes:mp4,mov,avi',
            'lokasi' => 'nullable|string|max:150',
        ]);

        // Ganti file jika ada
        if ($request->hasFile('file_path')) {
            // Hapus file lama
            \Storage::disk('public')->delete(str_replace('/storage/', '', $video->file_path));
            $path = $request->file('file_path')->store('uploads/videos', 'public');
            $video->file_path = '/storage/' . $path;
        }

        $video->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'lokasi' => $request->lokasi,
        ]);

        return redirect()->route('videos.show', $video->id)
                        ->with('success', 'Video berhasil diupdate!');
    }

    /**
     * Hapus video
     */
    public function destroy(Video $video)
    {
        // Hapus file fisik
        \Storage::disk('public')->delete(str_replace('/storage/', '', $video->file_path));

        $video->delete();

        return redirect()->route('videos.index')
                        ->with('success', 'Video berhasil dihapus!');
    }
}
