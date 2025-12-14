<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
use App\Models\Event;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Seed Articles
        Article::create([
            'title' => 'Mengenal Tradisi Kurung Damar',
            'content' => 'Kurung damar adalah salah satu tradisi Jawa yang sangat unik dan penuh makna. Tradisi ini biasanya dilakukan pada bulan Ramadan atau acara-acara khusus. Dalam tradisi ini, masyarakat membuat lentera dari bambu yang dihias dengan kertas berwarna-warni. Kurung damar tidak hanya berfungsi sebagai penerangan, tetapi juga sebagai simbol harapan dan doa. Setiap warna yang digunakan memiliki makna tersendiri dalam filosofi Jawa. Proses pembuatan kurung damar sendiri melibatkan berbagai keterampilan, mulai dari menganyam bambu hingga menghias dengan kertas. Tradisi ini diturunkan dari generasi ke generasi dan tetap dijaga kelestariannya hingga saat ini.',
            'excerpt' => 'Mengenal lebih dekat tradisi kurung damar yang penuh makna dan filosofi dalam budaya Jawa.',
            'image' => null,
            'author' => 'Admin',
            'category' => 'Budaya',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Cara Membuat Kurung Damar Sendiri',
            'content' => 'Membuat kurung damar sendiri sebenarnya tidak terlalu sulit jika kita tahu langkah-langkahnya. Pertama, siapkan bahan-bahan seperti bambu, kertas warna, lem, dan benang. Bambu dipotong dan dibentuk sesuai dengan desain yang diinginkan. Setelah itu, kertas warna dipotong dan ditempel pada rangka bambu. Proses ini membutuhkan ketelitian dan kesabaran. Anda bisa menambahkan berbagai ornamen seperti pola batik atau motif tradisional lainnya. Kurung damar yang sudah jadi bisa digunakan sebagai dekorasi atau hadiah untuk orang tersayang. Dengan membuat kurung damar sendiri, kita turut melestarikan budaya dan mengajarkan nilai-nilai tradisi kepada generasi muda.',
            'excerpt' => 'Panduan lengkap membuat kurung damar dengan langkah mudah untuk pemula.',
            'image' => null,
            'author' => 'Admin',
            'category' => 'Tutorial',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Makna Filosofis di Balik Kurung Damar',
            'content' => 'Kurung damar memiliki makna filosofis yang dalam dalam budaya Jawa. Cahaya yang dipancarkan dari kurung damar melambangkan harapan dan petunjuk dalam menjalani hidup. Warna-warna yang digunakan juga memiliki simbolisme tersendiri. Merah melambangkan keberanian, kuning melambangkan kesucian, hijau melambangkan kesuburan, dan biru melambangkan kedamaian. Bentuk kurung damar yang menggantung juga memiliki makna sebagai pengingat bahwa manusia harus selalu rendah hati. Tradisi ini mengajarkan kita untuk selalu menjaga keseimbangan antara dunia dan akhirat, serta pentingnya menjaga hubungan dengan sesama dan sang pencipta.',
            'excerpt' => 'Memahami filosofi dan makna mendalam dari tradisi kurung damar dalam budaya Jawa.',
            'image' => null,
            'author' => 'Admin',
            'category' => 'Budaya',
            'is_published' => true,
            'published_at' => now(),
        ]);

        // Seed Events
        Event::create([
            'title' => 'Workshop Membuat Kurung Damar',
            'slug' => 'workshop-membuat-kurung-damar',
            'description' => str_repeat('Workshop ini akan mengajarkan teknik dasar pembuatan kurung damar dari bambu dan kertas. Peserta akan belajar langsung dari pengrajin berpengalaman tentang cara memilih bahan, membentuk rangka, hingga menghias kurung damar dengan motif tradisional. ', 5),
            'short_description' => 'Belajar membuat kurung damar langsung dari ahlinya',
            'image' => null,
            'location' => 'Pendopo Desa Karanganyar, Semarang',
            'start_date' => now()->addDays(10),
            'end_date' => now()->addDays(10)->addHours(4),
            'max_participants' => 30,
            'registered_participants' => 12,
            'status' => 'upcoming',
            'is_featured' => true,
        ]);

        Event::create([
            'title' => 'Festival Kurung Damar 2025',
            'slug' => 'festival-kurung-damar-2025',
            'description' => str_repeat('Festival tahunan yang menampilkan berbagai macam kurung damar dari berbagai daerah di Jawa. Acara ini menampilkan lomba membuat kurung damar, pameran, dan pertunjukan seni budaya. Pengunjung dapat melihat langsung proses pembuatan dan membeli kurung damar langsung dari pengrajin. ', 5),
            'short_description' => 'Festival tahunan perayaan tradisi kurung damar',
            'image' => null,
            'location' => 'Alun-alun Kota Semarang',
            'start_date' => now()->addDays(30),
            'end_date' => now()->addDays(32),
            'max_participants' => 500,
            'registered_participants' => 156,
            'status' => 'upcoming',
            'is_featured' => true,
        ]);

        // Seed Products
        Product::create([
            'name' => 'Kurung Damar Tradisional',
            'slug' => 'kurung-damar-tradisional',
            'description' => 'Kurung damar dengan desain tradisional Jawa. Dibuat dari bambu pilihan dan kertas berkualitas dengan motif batik. Cocok untuk dekorasi rumah atau hadiah.',
            'short_description' => 'Kurung damar tradisional dengan motif batik',
            'price' => 75000,
            'stock' => 25,
            'sku' => 'KDT-001',
            'images' => json_encode([]),
            'category' => 'traditional',
            'is_featured' => true,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Kurung Damar Modern',
            'slug' => 'kurung-damar-modern',
            'description' => 'Kurung damar dengan sentuhan desain modern. Menggunakan bahan berkualitas tinggi dengan warna-warna cerah dan menarik. Sempurna untuk dekorasi ruangan.',
            'short_description' => 'Kurung damar desain modern',
            'price' => 95000,
            'stock' => 15,
            'sku' => 'KDM-001',
            'images' => json_encode([]),
            'category' => 'modern',
            'is_featured' => true,
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'DIY Kit Kurung Damar',
            'slug' => 'diy-kit-kurung-damar',
            'description' => 'Paket lengkap untuk membuat kurung damar sendiri. Termasuk bambu yang sudah dipotong, kertas warna, lem, dan panduan lengkap. Cocok untuk kegiatan keluarga.',
            'short_description' => 'Paket DIY membuat kurung damar',
            'price' => 50000,
            'stock' => 40,
            'sku' => 'KDD-001',
            'images' => json_encode([]),
            'category' => 'diy',
            'is_featured' => false,
            'is_active' => true,
        ]);
    }
}
