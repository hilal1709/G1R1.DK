<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

echo "=== Event Registrations ===\n\n";

$registrations = DB::table('event_registrations')
    ->join('events', 'event_registrations.event_id', '=', 'events.id')
    ->join('users', 'event_registrations.user_id', '=', 'users.id')
    ->select('events.title as event_title', 'users.name as user_name', 'event_registrations.registered_at')
    ->get();

foreach ($registrations as $reg) {
    echo "Event: {$reg->event_title}\n";
    echo "  User: {$reg->user_name}\n";
    echo "  Registered: {$reg->registered_at}\n\n";
}

echo "\n=== Event Statistics ===\n\n";

$events = DB::table('events')
    ->select('id', 'title', 'registered_participants', 'max_participants')
    ->get();

foreach ($events as $event) {
    $actualCount = DB::table('event_registrations')
        ->where('event_id', $event->id)
        ->count();

    echo "Event: {$event->title}\n";
    echo "  Stored count: {$event->registered_participants}\n";
    echo "  Actual count: {$actualCount}\n";
    echo "  Max: {$event->max_participants}\n\n";
}
