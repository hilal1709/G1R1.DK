<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Generate clean slug from title with fancy Unicode characters
     */
    private function generateSlug($title, $id = null)
    {
        // Konversi karakter mathematical bold dan fancy Unicode ke ASCII
        $cleanTitle = strtr($title, [
            '𝐀' => 'A',
            '𝐁' => 'B',
            '𝐂' => 'C',
            '𝐃' => 'D',
            '𝐄' => 'E',
            '𝐅' => 'F',
            '𝐆' => 'G',
            '𝐇' => 'H',
            '𝐈' => 'I',
            '𝐉' => 'J',
            '𝐊' => 'K',
            '𝐋' => 'L',
            '𝐌' => 'M',
            '𝐍' => 'N',
            '𝐎' => 'O',
            '𝐏' => 'P',
            '𝐐' => 'Q',
            '𝐑' => 'R',
            '𝐒' => 'S',
            '𝐓' => 'T',
            '𝐔' => 'U',
            '𝐕' => 'V',
            '𝐖' => 'W',
            '𝐗' => 'X',
            '𝐘' => 'Y',
            '𝐙' => 'Z',
            '𝐚' => 'a',
            '𝐛' => 'b',
            '𝐜' => 'c',
            '𝐝' => 'd',
            '𝐞' => 'e',
            '𝐟' => 'f',
            '𝐠' => 'g',
            '𝐡' => 'h',
            '𝐢' => 'i',
            '𝐣' => 'j',
            '𝐤' => 'k',
            '𝐥' => 'l',
            '𝐦' => 'm',
            '𝐧' => 'n',
            '𝐨' => 'o',
            '𝐩' => 'p',
            '𝐪' => 'q',
            '𝐫' => 'r',
            '𝐬' => 's',
            '𝐭' => 't',
            '𝐮' => 'u',
            '𝐯' => 'v',
            '𝐰' => 'w',
            '𝐱' => 'x',
            '𝐲' => 'y',
            '𝐳' => 'z',
            '𝟎' => '0',
            '𝟏' => '1',
            '𝟐' => '2',
            '𝟑' => '3',
            '𝟒' => '4',
            '𝟓' => '5',
            '𝟔' => '6',
            '𝟕' => '7',
            '𝟖' => '8',
            '𝟗' => '9',
        ]);

        // Hapus emoji dan karakter non-ASCII
        $cleanTitle = preg_replace('/[^\x20-\x7E]/u', '', $cleanTitle);
        $cleanTitle = trim($cleanTitle);

        return Str::slug($cleanTitle ?: 'event-' . ($id ?: time()));
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        } else {
            $query->active();
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('location', 'like', "%{$request->search}%");
            });
        }

        // Minimal tampilkan 5 event yang dapat diakses dengan baik
        $events = $query->with('creator')
            ->orderBy('start_date', 'asc')
            ->paginate(6); // 6 event per halaman untuk tampilan yang baik

        return Inertia::render('Events/Index', [
            'events' => $events,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000', // Maksimal 2000 karakter
            'short_description' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Gambar opsional
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_date' => 'nullable|date',
            'end_time' => 'nullable|date_format:H:i',
            'max_participants' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ], [
            'description.max' => 'Deskripsi maksimal 2000 karakter',
        ]);

        // Gabungkan date dan time menjadi datetime
        $validated['start_date'] = $validated['start_date'] . ' ' . $validated['start_time'];
        if (!empty($validated['end_date']) && !empty($validated['end_time'])) {
            $validated['end_date'] = $validated['end_date'] . ' ' . $validated['end_time'];
        } else {
            $validated['end_date'] = $validated['start_date']; // Default sama dengan start
        }

        // Hapus field time karena sudah digabungkan
        unset($validated['start_time'], $validated['end_time']);

        $validated['slug'] = $this->generateSlug($validated['title']);
        $validated['created_by'] = Auth::id();
        $validated['status'] = 'upcoming'; // Set status default
        $validated['registered_participants'] = 0; // Set registered participants default

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('events', 'public');
        }

        Event::create($validated);

        return redirect()->route('events.index')->with('success', 'Event berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load('creator');

        // Ambil event terkait (3 event upcoming lainnya)
        $relatedEvents = Event::where('id', '!=', $event->id)
            ->where('status', 'upcoming')
            ->orderBy('start_date', 'asc')
            ->take(3)
            ->get();

        // Cek apakah user sudah register
        $isRegistered = false;
        if (auth()->check()) {
            $isRegistered = $event->participants()->where('user_id', auth()->id())->exists();
        }

        return Inertia::render('Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'isRegistered' => $isRegistered,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        // Pisahkan date dan time untuk form
        $eventData = $event->toArray();
        $eventData['start_date'] = date('Y-m-d', strtotime($event->start_date));
        $eventData['start_time'] = date('H:i', strtotime($event->start_date));
        $eventData['end_date'] = date('Y-m-d', strtotime($event->end_date));
        $eventData['end_time'] = date('H:i', strtotime($event->end_date));

        return Inertia::render('Events/Edit', [
            'event' => $eventData,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000', // Maksimal 2000 karakter
            'short_description' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_date' => 'nullable|date',
            'end_time' => 'nullable|date_format:H:i',
            'max_participants' => 'nullable|integer|min:1',
            'status' => 'required|in:upcoming,ongoing,completed,cancelled',
            'is_featured' => 'boolean',
        ], [
            'description.max' => 'Deskripsi maksimal 2000 karakter',
        ]);

        // Gabungkan date dan time menjadi datetime
        $validated['start_date'] = $validated['start_date'] . ' ' . $validated['start_time'];
        if (!empty($validated['end_date']) && !empty($validated['end_time'])) {
            $validated['end_date'] = $validated['end_date'] . ' ' . $validated['end_time'];
        } else {
            $validated['end_date'] = $validated['start_date']; // Default sama dengan start
        }

        // Hapus field time karena sudah digabungkan
        unset($validated['start_time'], $validated['end_time']);

        $validated['slug'] = $this->generateSlug($validated['title'], $event->id);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($event->image) {
                Storage::disk('public')->delete($event->image);
            }
            $validated['image'] = $request->file('image')->store('events', 'public');
        } else {
            // Jangan update field image jika tidak ada file baru
            unset($validated['image']);
        }

        $event->update($validated);

        return redirect()->route('events.index')->with('success', 'Event berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Delete image
        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event berhasil dihapus!');
    }

    /**
     * Register user to event
     */
    public function register(Event $event)
    {
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Silakan login terlebih dahulu!');
        }

        // Cek apakah user sudah terdaftar
        if ($event->participants()->where('user_id', auth()->id())->exists()) {
            return back()->with('error', 'Anda sudah terdaftar di event ini!');
        }

        // Cek apakah event sudah penuh
        if ($event->is_full) {
            return back()->with('error', 'Event sudah penuh!');
        }

        // Daftarkan user ke event
        $event->participants()->attach(auth()->id(), [
            'registered_at' => now(),
        ]);

        // Update jumlah registered_participants
        $event->increment('registered_participants');

        return back()->with('success', 'Berhasil mendaftar event!');
    }
}
