<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventRegistrationController extends Controller
{
    /**
     * Register user ke event
     */
    public function store(Request $request, Event $event)
    {
        $user = Auth::user();

        // 1. Cek sudah daftar atau belum
        $alreadyRegistered = EventRegistration::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyRegistered) {
            return back()->withErrors([
                'registration' => 'Kamu sudah terdaftar di event ini.'
            ]);
        }

        // 2. Cek kuota
        if ($event->max_pendaftar !== null) {
            $registeredCount = $event->registrations()->count();

            if ($registeredCount >= $event->max_pendaftar) {
                return back()->withErrors([
                    'registration' => 'Kuota event sudah penuh.'
                ]);
            }
        }

        // 3. Simpan registrasi
        EventRegistration::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
        ]);

        return back()->with('success', 'Berhasil mendaftar event!');
    }

    /**
     * Batalkan pendaftaran
     */
    public function destroy(Event $event)
    {
        $user = Auth::user();

        EventRegistration::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->delete();

        return back()->with('success', 'Pendaftaran dibatalkan.');
    }
}
