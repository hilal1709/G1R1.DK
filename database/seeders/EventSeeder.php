<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Workshop Membuat Damar Kurung untuk Pemula',
                'slug' => Str::slug('Workshop Membuat Damar Kurung untuk Pemula'),
                'description' => 'Workshop intensif selama 2 hari untuk belajar membuat Damar Kurung dari nol. Peserta akan dipandu oleh pengrajin berpengalaman lebih dari 20 tahun. Materi meliputi pemilihan bahan, teknik membentuk rangka, pewarnaan, dan finishing. Semua bahan disediakan oleh panitia.',
                'short_description' => 'Belajar membuat Damar Kurung dari nol dalam 2 hari',
                'image' => '',
                'location' => 'Workshop Damar Kurung Gresik, Jl. Sunan Giri No. 45, Gresik',
                'start_date' => '2025-12-15 09:00:00',
                'end_date' => '2025-12-16 16:00:00',
                'max_participants' => 30,
                'registered_participants' => 12,
                'status' => 'upcoming',
                'is_featured' => true,
                'created_by' => null,
            ],
            [
                'title' => 'Pameran Seni & Budaya Damar Kurung Nusantara',
                'slug' => Str::slug('Pameran Seni & Budaya Damar Kurung Nusantara'),
                'description' => 'Pameran besar yang menampilkan lebih dari 100 karya Damar Kurung dari berbagai daerah di Indonesia. Akan ada talk show dengan budayawan, demo pembuatan langsung, dan bazaar produk kerajinan. Acara gratis untuk umum.',
                'short_description' => 'Pameran 100+ karya Damar Kurung dari seluruh Indonesia',
                'image' => '',
                'location' => 'Jakarta Convention Center, Hall A',
                'start_date' => '2025-12-20 10:00:00',
                'end_date' => '2025-12-23 20:00:00',
                'max_participants' => null,
                'registered_participants' => 0,
                'status' => 'upcoming',
                'is_featured' => true,
                'created_by' => null,
            ],
            [
                'title' => 'Festival Damar Kurung Gresik 2026',
                'slug' => Str::slug('Festival Damar Kurung Gresik 2026'),
                'description' => 'Festival tahunan terbesar yang diselenggarakan di Alun-alun Gresik. Ribuan Damar Kurung akan dinyalakan bersamaan menciptakan pemandangan spektakuler. Ada lomba menghias Damar Kurung, pentas seni, kuliner khas Gresik, dan kembang api.',
                'short_description' => 'Festival tahunan dengan ribuan Damar Kurung menyala',
                'image' => '',
                'location' => 'Alun-alun Gresik',
                'start_date' => '2026-01-01 17:00:00',
                'end_date' => '2026-01-01 23:00:00',
                'max_participants' => null,
                'registered_participants' => 0,
                'status' => 'upcoming',
                'is_featured' => true,
                'created_by' => null,
            ],
            [
                'title' => 'Pelatihan Bisnis UMKM Kerajinan',
                'slug' => Str::slug('Pelatihan Bisnis UMKM Kerajinan'),
                'description' => 'Pelatihan khusus untuk pelaku UMKM kerajinan. Materi meliputi digital marketing, fotografi produk, packaging, dan cara memasarkan produk secara online. Dibimbing oleh praktisi UMKM sukses dan konsultan bisnis.',
                'short_description' => 'Pelatihan digital marketing untuk UMKM kerajinan',
                'image' => '',
                'location' => 'Gedung UMKM Center Gresik',
                'start_date' => '2025-12-10 08:00:00',
                'end_date' => '2025-12-10 17:00:00',
                'max_participants' => 50,
                'registered_participants' => 35,
                'status' => 'upcoming',
                'is_featured' => false,
                'created_by' => null,
            ],
            [
                'title' => 'Kelas Online: Pewarnaan dan Motif Damar Kurung',
                'slug' => Str::slug('Kelas Online: Pewarnaan dan Motif Damar Kurung'),
                'description' => 'Kelas online via Zoom untuk belajar teknik pewarnaan dan membuat motif pada Damar Kurung. Cocok untuk yang sudah punya dasar dan ingin meningkatkan skill. Sertifikat untuk peserta yang menyelesaikan kelas.',
                'short_description' => 'Kelas online teknik pewarnaan dan motif',
                'image' => '',
                'location' => 'Online via Zoom',
                'start_date' => '2025-12-05 19:00:00',
                'end_date' => '2025-12-05 21:00:00',
                'max_participants' => 100,
                'registered_participants' => 67,
                'status' => 'upcoming',
                'is_featured' => false,
                'created_by' => null,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
