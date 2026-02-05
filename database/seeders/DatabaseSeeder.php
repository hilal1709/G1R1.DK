<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
use App\Models\Event;
use App\Models\Product;
use App\Models\Category;
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
                'role' => 'admin',
            ]
        );

        // Seed Articles
        Article::create([
            'title' => 'Mengenal Tradisi Kurung Damar',
            'content' => 'Kurung damar adalah salah satu tradisi Jawa yang sangat unik dan penuh makna. Tradisi ini biasanya dilakukan pada bulan Ramadan atau acara-acara khusus. Dalam tradisi ini, masyarakat membuat lentera dari bambu yang dihias dengan kertas berwarna-warni. Kurung damar tidak hanya berfungsi sebagai penerangan, tetapi juga sebagai simbol harapan dan doa. Setiap warna yang digunakan memiliki makna tersendiri dalam filosofi Jawa. Proses pembuatan kurung damar sendiri melibatkan berbagai keterampilan, mulai dari menganyam bambu hingga menghias dengan kertas. Tradisi ini diturunkan dari generasi ke generasi dan tetap dijaga kelestariannya hingga saat ini.',
            'excerpt' => 'Mengenal lebih dekat tradisi kurung damar yang penuh makna dan filosofi dalam budaya Jawa.',
            'author' => 'Admin',
            'category' => 'Budaya',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Cara Membuat Kurung Damar Sendiri',
            'content' => 'Membuat kurung damar sendiri sebenarnya tidak terlalu sulit jika kita tahu langkah-langkahnya. Pertama, siapkan bahan-bahan seperti bambu, kertas warna, lem, dan benang. Bambu dipotong dan dibentuk sesuai dengan desain yang diinginkan. Setelah itu, kertas warna dipotong dan ditempel pada rangka bambu. Proses ini membutuhkan ketelitian dan kesabaran. Anda bisa menambahkan berbagai ornamen seperti pola batik atau motif tradisional lainnya. Kurung damar yang sudah jadi bisa digunakan sebagai dekorasi atau hadiah untuk orang tersayang. Dengan membuat kurung damar sendiri, kita turut melestarikan budaya dan mengajarkan nilai-nilai tradisi kepada generasi muda.',
            'excerpt' => 'Panduan lengkap membuat kurung damar dengan langkah mudah untuk pemula.',
            'author' => 'Admin',
            'category' => 'Tutorial',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Article::create([
            'title' => 'Makna Filosofis di Balik Kurung Damar',
            'content' => 'Kurung damar memiliki makna filosofis yang dalam dalam budaya Jawa. Cahaya yang dipancarkan dari kurung damar melambangkan harapan dan petunjuk dalam menjalani hidup. Warna-warna yang digunakan juga memiliki simbolisme tersendiri. Merah melambangkan keberanian, kuning melambangkan kesucian, hijau melambangkan kesuburan, dan biru melambangkan kedamaian. Bentuk kurung damar yang menggantung juga memiliki makna sebagai pengingat bahwa manusia harus selalu rendah hati. Tradisi ini mengajarkan kita untuk selalu menjaga keseimbangan antara dunia dan akhirat, serta pentingnya menjaga hubungan dengan sesama dan sang pencipta.',
            'excerpt' => 'Memahami filosofi dan makna mendalam dari tradisi kurung damar dalam budaya Jawa.',
            'author' => 'Admin',
            'category' => 'Budaya',
            'is_published' => true,
            'published_at' => now(),
        ]);

        // Seed Categories
        $categoryTraditional = Category::create([
            'nama' => 'Tradisional',
        ]);

        $categoryModern = Category::create([
            'nama' => 'Modern',
        ]);

        $categoryDIY = Category::create([
            'nama' => 'DIY Kit',
        ]);

        // Seed Events
        Event::create([
            'nama' => 'Workshop Membuat Kurung Damar',
            'deskripsi' => 'Workshop ini akan mengajarkan teknik dasar pembuatan kurung damar dari bambu dan kertas. Peserta akan belajar langsung dari pengrajin berpengalaman tentang cara memilih bahan, membentuk rangka, hingga menghias kurung damar dengan motif tradisional.',
            'lokasi' => 'Pendopo Desa Karanganyar, Semarang',
            'tanggal' => now()->addDays(10),
        ]);

        Event::create([
            'nama' => 'Festival Kurung Damar 2026',
            'deskripsi' => 'Festival tahunan yang menampilkan berbagai macam kurung damar dari berbagai daerah di Jawa. Acara ini menampilkan lomba membuat kurung damar, pameran, dan pertunjukan seni budaya.',
            'lokasi' => 'Alun-alun Kota Semarang',
            'tanggal' => now()->addDays(30),
        ]);

        // Seed Products
        Product::create([
            'category_id' => $categoryTraditional->id,
            'nama' => 'Kurung Damar Tradisional',
            'deskripsi' => 'Kurung damar dengan desain tradisional Jawa. Dibuat dari bambu pilihan dan kertas berkualitas dengan motif batik. Cocok untuk dekorasi rumah atau hadiah.',
            'harga' => 75000,
            'stok' => 25,
            'sku' => 'KDT-001',
        ]);

        Product::create([
            'category_id' => $categoryModern->id,
            'nama' => 'Kurung Damar Modern',
            'deskripsi' => 'Kurung damar dengan sentuhan desain modern. Menggunakan bahan berkualitas tinggi dengan warna-warna cerah dan menarik. Sempurna untuk dekorasi ruangan.',
            'harga' => 95000,
            'stok' => 15,
            'sku' => 'KDM-001',
        ]);

        Product::create([
            'category_id' => $categoryDIY->id,
            'nama' => 'DIY Kit Kurung Damar',
            'deskripsi' => 'Paket lengkap untuk membuat kurung damar sendiri. Termasuk bambu yang sudah dipotong, kertas warna, lem, dan panduan lengkap. Cocok untuk kegiatan keluarga.',
            'harga' => 50000,
            'stok' => 40,
            'sku' => 'KDD-001',
        ]);
    }
}
