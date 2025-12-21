<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventMedia;
use App\Models\Event;

class EventMediaController extends Controller
{

    /**
     * Simpan media baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'file_path' => 'required|string',
        ]);

        $media = EventMedia::create($request->only(['event_id','file_path']));

        return $media->load('event');
    }

    /**
     * Update media
     */
    public function update(Request $request, EventMedia $eventMedia)
    {
        $request->validate([
            'file_path' => 'sometimes|required|string',
        ]);

        $eventMedia->update($request->only(['file_path']));

        return $eventMedia->load('event');
    }

    /**
     * Hapus media
     */
    public function destroy(EventMedia $eventMedia)
    {
        $eventMedia->delete();
        return response()->json(['message' => 'Media berhasil dihapus']);
    }
}
