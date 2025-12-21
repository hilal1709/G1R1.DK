<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Damar Kurung Klasik Motif Batik',
                'slug' => Str::slug('Damar Kurung Klasik Motif Batik'),
                'description' => 'Damar Kurung dengan desain klasik tradisional yang menampilkan motif batik khas Gresik. Dibuat dengan teknik pewarnaan manual menggunakan cat air berkualitas tinggi. Rangka terbuat dari bambu pilihan yang kuat dan tahan lama. Cocok untuk dekorasi ruang tamu atau sebagai hadiah istimewa.',
                'short_description' => 'Desain klasik dengan motif batik tradisional Gresik',
                'price' => 150000,
                'discount_price' => null,
                'stock' => 25,
                'sku' => 'DK-KLS-001',
                'category' => 'Klasik',
                'images' => json_encode([]),
                'shopee_link' => 'https://shopee.co.id/damar-kurung-klasik',
                'is_featured' => true,
                'is_active' => true,
                'rating' => 4.8,
                'total_reviews' => 12,
            ],
            [
                'name' => 'Damar Kurung Modern Minimalis',
                'slug' => Str::slug('Damar Kurung Modern Minimalis'),
                'description' => 'Perpaduan sempurna antara tradisi dan desain modern. Damar Kurung ini menampilkan garis-garis minimalis dengan warna-warna pastel yang lembut. Menggunakan bahan kertas premium dan rangka aluminium ringan. Sempurna untuk interior rumah bergaya kontemporer.',
                'short_description' => 'Perpaduan tradisi dengan desain minimalis modern',
                'price' => 200000,
                'discount_price' => 180000,
                'stock' => 18,
                'sku' => 'DK-MOD-001',
                'category' => 'Modern',
                'images' => json_encode([]),
                'shopee_link' => 'https://shopee.co.id/damar-kurung-modern',
                'is_featured' => true,
                'is_active' => true,
                'rating' => 4.9,
                'total_reviews' => 8,
            ],
            [
                'name' => 'Damar Kurung Premium Gold Edition',
                'slug' => Str::slug('Damar Kurung Premium Gold Edition'),
                'description' => 'Produk premium dengan finishing emas 24 karat pada bagian rangka. Menggunakan kertas kaligrafi khusus dengan motif islami yang indah. Setiap detail dikerjakan dengan presisi tinggi oleh pengrajin berpengalaman. Dilengkapi dengan sistem pencahayaan LED yang dapat diatur kecerahannya.',
                'short_description' => 'Kualitas premium dengan finishing emas 24K',
                'price' => 350000,
                'discount_price' => null,
                'stock' => 10,
                'sku' => 'DK-PRM-001',
                'category' => 'Premium',
                'images' => json_encode([]),
                'shopee_link' => 'https://shopee.co.id/damar-kurung-premium',
                'is_featured' => true,
                'is_active' => true,
                'rating' => 5.0,
                'total_reviews' => 5,
            ],
            [
                'name' => 'Damar Kurung Mini untuk Meja',
                'slug' => Str::slug('Damar Kurung Mini untuk Meja'),
                'description' => 'Ukuran mini yang sempurna untuk dekorasi meja kerja atau meja belajar. Meskipun berukuran kecil, detail dan kualitasnya tetap terjaga. Dilengkapi dengan lampu LED bertenaga baterai sehingga praktis dan portabel.',
                'short_description' => 'Ukuran mini cocok untuk dekorasi meja',
                'price' => 75000,
                'discount_price' => 65000,
                'stock' => 50,
                'sku' => 'DK-MIN-001',
                'category' => 'Mini',
                'images' => json_encode([]),
                'shopee_link' => null,
                'is_featured' => false,
                'is_active' => true,
                'rating' => 4.7,
                'total_reviews' => 20,
            ],
            [
                'name' => 'Damar Kurung Jumbo untuk Event',
                'slug' => Str::slug('Damar Kurung Jumbo untuk Event'),
                'description' => 'Ukuran jumbo khusus untuk event, pameran, atau dekorasi gedung. Tinggi mencapai 2 meter dengan diameter 80cm. Konstruksi extra kuat menggunakan rangka besi hollow. Cocok untuk acara pernikahan, exhibition, atau dekorasi hotel.',
                'short_description' => 'Ukuran jumbo untuk event dan pameran besar',
                'price' => 1500000,
                'discount_price' => null,
                'stock' => 5,
                'sku' => 'DK-JMB-001',
                'category' => 'Jumbo',
                'images' => json_encode([]),
                'shopee_link' => null,
                'is_featured' => false,
                'is_active' => true,
                'rating' => 4.9,
                'total_reviews' => 3,
            ],
            [
                'name' => 'Damar Kurung Custom Design',
                'slug' => Str::slug('Damar Kurung Custom Design'),
                'description' => 'Layanan custom design sesuai keinginan Anda. Bisa memilih ukuran, motif, warna, dan tema sesuai kebutuhan. Konsultasi gratis dengan desainer kami untuk hasil terbaik. Waktu pengerjaan 7-14 hari kerja.',
                'short_description' => 'Custom design sesuai keinginan Anda',
                'price' => 250000,
                'discount_price' => null,
                'stock' => 100,
                'sku' => 'DK-CST-001',
                'category' => 'Custom',
                'images' => json_encode([]),
                'shopee_link' => null,
                'is_featured' => false,
                'is_active' => true,
                'rating' => 4.8,
                'total_reviews' => 15,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
