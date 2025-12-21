<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventMedia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    protected $user;

    public function index()
    {
        $query = Event::query();

        // Filter by status (jika ada)
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        } else {
            $query->active(); // Misalnya 'active()' adalah scope untuk event yang aktif
        }

        // Search (jika ada pencarian)
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('location', 'like', "%{$request->search}%");
            });
        }

        // Mengambil event dengan relasi, urutan berdasarkan tanggal_mulai, dan paginasi
        $events = $query->with('eventmedias', 'comments.user', 'creator') // load relasi yang dibutuhkan
            ->orderBy('tanggal_mulai', 'asc')
            ->paginate(6); // 6 event per halaman untuk tampilan yang baik

        return Inertia::render('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'status']), // untuk filters yang digunakan
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'lokasi' => 'nullable|string|max:150',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'files.*' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov',
            'tanggal_mulai' => 'required|date',
            'waktu_mulai' => 'required|date_format:H:i',
            'tanggal_selesai' => 'nullable|date',
            'waktu_selesai' => 'nullable|date_format:H:i',
            'max_pendaftar' => 'nullable|integer|min:1',
        ]);

        // Gabungkan date dan time menjadi datetime
        $validated['tanggal_mulai'] = $validated['tanggal_mulai'] . ' ' . $validated['waktu_mulai'];
        if (!empty($validated['tanggal_selesai']) && !empty($validated['waktu_selesai'])) {
            $validated['tanggal_selesai'] = $validated['tanggal_selesai'] . ' ' . $validated['waktu_selesai'];
        } else {
            $validated['tanggal_selesai'] = $validated['tanggal_selesai']; // Default sama dengan start
        }

        // Hapus field time karena sudah digabungkan
        unset($validated['waktu_mulai'], $validated['waktu_selesai']);
        $validated['status'] = 'upcoming'; // Set status default
        $validated['user_id'] = auth()->id();
        Event::create($validated);

        // Upload media
        if($request->hasFile('files')) {
            foreach($request->file('files') as $file) {
                $path = $file->store('uploads/eventmedia', 'public');
                $event->eventmedias()->create([
                    'file_path' => '/storage/'.$path,
                ]);
            }
        }

        return redirect()->route('events.index')->with('success', 'Event berhasil ditambahkan!');
    }

    public function show(Event $event)
    {
        $event->load('eventmedias','comments.user');

        // Ambil event terkait (3 event upcoming lainnya)
        $relatedEvents = Event::where('id', '!=', $event->id)
            ->where('status', 'upcoming')
            ->orderBy('tanggal_mulai', 'asc')
            ->take(3)
            ->get();

        return Inertia::render('Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }

    public function edit(Event $event)
    {
        // Pisahkan date dan time untuk form
        $eventData = $event->toArray();
        $eventData['tanggal_mulai'] = date('Y-m-d', strtotime($event->tanggal_mulai));
        $eventData['waktu_mulai'] = date('H:i', strtotime($event->tanggal_mulai));
        $eventData['tanggal_selesai'] = date('Y-m-d', strtotime($event->tanggal_selesai));
        $eventData['waktu_selesai'] = date('H:i', strtotime($event->tanggal_selesai));

        return Inertia::render('Events/Edit', [
            'event' => $eventData,
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $request->validate([
            'nama' => 'required|string|max:200',
            'lokasi' => 'nullable|string|max:150',
            'tanggal' => 'nullable|date',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'waktu_mulai' => 'required|date_format:H:i',
            'tanggal_selesai' => 'nullable|date',
            'waktu_selesai' => 'nullable|date_format:H:i',
            'max_pendaftar' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
        ]);

        // Gabungkan date dan time menjadi datetime
        $validated['tanggal_mulai'] = $validated['tanggal_mulai'] . ' ' . $validated['waktu_mulai'];
        if (!empty($validated['tanggal_selesai']) && !empty($validated['waktu_selesai'])) {
            $validated['tanggal_selesai'] = $validated['tanggal_selesai'] . ' ' . $validated['waktu_selesai'];
        } else {
            $validated['tanggal_selesai'] = $validated['tanggal_mulai']; // Default sama dengan start
        }

        // Hapus field time karena sudah digabungkan
        unset($validated['waktu_mulai'], $validated['waktu_selesai']);

        $event->update($validated);

        // Replace media lama
        if($request->has('replace_files')) {
            foreach($request->replace_files as $mediaId => $file) {
                $media = EventMedia::find($mediaId);
                if($media && $file) {
                    \Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
                    $path = $file->store('uploads/eventmedia', 'public');
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
                $path = $file->store('uploads/eventmedia', 'public');
                $event->eventmedias()->create(['file_path' => '/storage/'.$path]);
            }
        }

        return redirect()->route('events.index')->with('success', 'Event berhasil diupdate!');
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
