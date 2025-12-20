<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventMedia;

class EventController extends Controller
{
    protected $user;

    public function index()
    {
        $events = Event::with('eventmedias', 'comments.user')->get();
        return view('events.index', compact('events'));
    }

    public function create()
    {
        return view('events.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'lokasi' => 'nullable|string|max:150',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'files.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov',
        ]);

        $event = Event::create([
            'nama' => $request->nama,
            'lokasi' => $request->lokasi,
            'tanggal' => $request->tanggal,
            'deskripsi' => $request->deskripsi,
            'user_id' => auth()->id(),
        ]);

        // Upload media
        if($request->hasFile('files')) {
            foreach($request->file('files') as $file) {
                $path = $file->store('uploads', 'public');
                $event->eventmedias()->create([
                    'file_path' => '/storage/'.$path,
                ]);
            }
        }

        return redirect()->back()->with('success','Event berhasil dibuat!');
    }

    public function show(Event $event)
    {
        $event->load('eventmedias','comments.user');
        return view('events.show', compact('event'));
    }

    public function edit(Event $event)
    {
        return view('events.edit', compact('event'));
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'lokasi' => 'nullable|string|max:150',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
        ]);

        $event->update($request->only('nama','lokasi','tanggal','deskripsi'));

        // Replace media lama
        if($request->has('replace_files')) {
            foreach($request->replace_files as $mediaId => $file) {
                $media = EventMedia::find($mediaId);
                if($media && $file) {
                    \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
                    $path = $file->store('uploads', 'public');
                    $media->update(['file_path' => '/storage/'.$path]);
                }
            }
        }

        // Hapus media lama
        if($request->has('delete_media')) {
            foreach($request->delete_media as $mediaId) {
                $media = EventMedia::find($mediaId);
                if($media) {
                    \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
                    $media->delete();
                }
            }
        }

        // Tambah media baru
        if($request->hasFile('files')) {
            foreach($request->file('files') as $file) {
                $path = $file->store('uploads','public');
                $event->eventmedias()->create(['file_path' => '/storage/'.$path]);
            }
        }

        return redirect()->back()->with('success','Event berhasil diupdate!');
    }

    public function destroy(Event $event)
    {
        foreach($event->eventmedias as $media) {
            \Storage::disk('public')->delete(str_replace('/storage/','',$media->file_path));
            $media->delete();
        }

        $event->delete();
        return redirect()->route('events.index')->with('success','Event berhasil dihapus!');
    }
}
