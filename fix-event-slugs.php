<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Event;
use Illuminate\Support\Str;

echo "Fixing event slugs...\n\n";

$events = Event::all();

foreach ($events as $event) {
    $oldSlug = $event->slug;

    // Konversi karakter Unicode fancy ke ASCII biasa
    $cleanTitle = $event->title;

    // Map karakter mathematical bold ke ASCII
    $cleanTitle = strtr($cleanTitle, [
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

    // Hapus emoji dan karakter khusus lainnya
    $cleanTitle = preg_replace('/[^\x20-\x7E]/u', '', $cleanTitle);
    $cleanTitle = trim($cleanTitle);

    $newSlug = Str::slug($cleanTitle ?: 'event-' . $event->id);

    if ($oldSlug !== $newSlug) {
        $event->slug = $newSlug;
        $event->save();
        echo "Updated: '{$event->title}'\n";
        echo "  Old slug: [{$oldSlug}]\n";
        echo "  New slug: [{$newSlug}]\n\n";
    } else {
        echo "OK: '{$event->title}' -> [{$oldSlug}]\n";
    }
}

echo "\nDone!\n";
