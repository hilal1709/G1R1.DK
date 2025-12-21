<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Event;
use Illuminate\Support\Facades\DB;

echo "Syncing registered_participants with actual registrations...\n\n";

$events = Event::withTrashed()->get();

foreach ($events as $event) {
    $actualCount = DB::table('event_registrations')
        ->where('event_id', $event->id)
        ->count();

    $oldCount = $event->registered_participants;

    // Update regardless to ensure sync
    $event->registered_participants = $actualCount;
    $event->save();

    if ($oldCount !== $actualCount) {
        echo "Updated: {$event->title}\n";
        echo "  Old: {$oldCount} -> New: {$actualCount}\n\n";
    } else {
        echo "OK: {$event->title} ({$actualCount} participants)\n";
    }
}

echo "\nDone!\n";
