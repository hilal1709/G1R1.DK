# 🏮 Dashboard Web Damar Kurung Gresik

## 📋 Deskripsi

Dashboard web interaktif yang menampilkan informasi lengkap tentang **Damar Kurung Gresik** - warisan budaya Indonesia yang kaya akan nilai sejarah dan filosofi. Website ini dirancang dengan konsep modern, animasi yang menarik, dan color palette yang mencerminkan kehangatan budaya Indonesia.

## 🎨 Fitur Utama

### 1. **Hero Section dengan Animasi Interaktif**

- Animasi lentera Damar Kurung yang mengapung dengan efek cahaya berkilau
- Partikel terapung yang mensimulasikan cahaya
- Gradient background dengan pola dekoratif
- Call-to-action yang responsif

### 2. **Section Pelestarian** 🏛️

- **Pelatihan Pengrajin**: Program regenerasi dengan mentor berpengalaman
- **Dokumentasi Tradisi**: Pencatatan teknik dan filosofi pembuatan
- **Edukasi Sekolah**: Integrasi dalam kurikulum muatan lokal
- **Pusat Kebudayaan**: Galeri dan workshop center
- **Sertifikasi Warisan**: Upaya pengakuan UNESCO
- **Komunitas Digital**: Platform online untuk kolaborasi

### 3. **Section Pengembangan** 💡
- **Desain Kontemporer**: Paduan motif tradisional dengan estetika modern
- **Teknologi Produksi**: Efisiensi tanpa hilangkan sentuhan tangan
- **Material Inovatif**: Eksplorasi bahan ramah lingkungan
- Statistik pencapaian (50+ Desain Baru, 100+ Pengrajin Terlatih, dll)

### 4. **Section Pemanfaatan** 🛍️

- **Industri Kreatif**:
    - Produk souvenir dan merchandise
    - Dekorasi interior dan event
    - Kolaborasi dengan desainer fashion
    - Ekspor produk ke mancanegara

- **Pariwisata Budaya**:
    - Paket wisata heritage Gresik
    - Festival Damar Kurung tahunan
    - Workshop wisatawan
    - Desa wisata berbasis kerajinan

### 5. **Dampak Ekonomi** 📊

- 500+ Lapangan Kerja
- 5M+ Omzet Tahunan (IDR)
- 10K+ Wisatawan/Tahun

## 🎨 Color Palette

Tema warna yang digunakan mencerminkan kehangatan dan keanggunan budaya Indonesia:

- **Primary**: Amber/Gold (#F59E0B, #F97316) - Representasi cahaya Damar
- **Secondary**: Deep Teal (#0D9488, #06B6D4) - Keanggunan dan ketenangan
- **Accent**: Coral/Rose (#FB7185, #F43F5E) - Kehangatan budaya
- **Background**: Warm Gradients (Amber-50 → Orange-50 → Rose-50)

## ✨ Animasi & Interaksi

### Framer Motion Animations:

1. **Scroll-based animations** - Konten muncul saat di-scroll
2. **Hover effects** - Kartu yang terangkat dan berputar saat di-hover
3. **Floating animations** - Lentera dan partikel yang mengapung
4. **Scale animations** - Efek zoom pada elemen interaktif
5. **Gradient transitions** - Perubahan warna yang smooth
6. **Parallax effect** - Background bergerak dengan kecepatan berbeda

### Interaktivitas:

- Smooth scroll navigation
- Hover effects pada semua card dan button
- Responsive design untuk semua ukuran layar
- Dark/Light mode support (via Tailwind)

## 🛠️ Teknologi yang Digunakan

### Frontend:

- **React 19** - Library UI modern
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animasi yang powerful
- **Lucide React** - Icon library yang indah
- **Inertia.js** - SPA tanpa API

### Backend:

- **Laravel 12** - PHP Framework
- **Inertia.js** - Server-side routing

## 📁 Struktur File

```
resources/js/pages/
└── damar-kurung.tsx    # Halaman utama dashboard Damar Kurung

routes/
└── web.php             # Route definition
```

## 🚀 Cara Menggunakan

### 1. Instalasi Dependencies

```bash
npm install
```

### 2. Jalankan Development Server

```bash
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite
npm run dev
```

### 3. Akses Website

- **Laravel**: http://127.0.0.1:8000
- **Vite Dev Server**: http://localhost:5173
- **Halaman Damar Kurung**: http://127.0.0.1:8000/damar-kurung

## 🎯 Navigasi

Dari halaman welcome, klik tombol **"Damar Kurung"** di navigasi untuk mengakses dashboard.

## 📱 Responsive Design

Website fully responsive untuk:

- 📱 Mobile (320px - 640px)
- 📱 Tablet (641px - 1024px)
- 💻 Desktop (1025px+)
- 🖥️ Large Desktop (1440px+)

## 🎭 Anti-Mainstream Features

1. **Custom Lantern Animation** - Animasi lentera yang unik dengan efek glow
2. **Particle System** - Sistem partikel yang mensimulasikan cahaya
3. **Gradient Overlays** - Multiple gradient layers untuk depth
4. **3D Hover Effects** - Efek rotasi 3D pada cards
5. **Smooth Scroll Progress** - Progress indicator dengan animasi
6. **Interactive Stats** - Statistik yang animate saat masuk viewport
7. **Blend Modes** - CSS blend modes untuk efek visual unik
8. **Custom Wave Dividers** - Pemisah section dengan SVG wave

## 🎨 Desain Principles

- **Cultural Authenticity** - Menghormati nilai budaya asli
- **Modern Aesthetics** - Tampilan contemporary yang clean
- **User Experience** - Navigasi yang intuitif dan smooth
- **Performance** - Optimized loading dan animation
- **Accessibility** - Support untuk screen readers dan keyboard navigation

## 🔮 Future Enhancements

- [ ] Gallery interaktif dengan foto Damar Kurung
- [ ] Virtual tour workshop pembuatan
- [ ] E-commerce integration untuk pembelian produk
- [ ] Blog section untuk artikel budaya
- [ ] Multi-language support (ID/EN)
- [ ] Admin dashboard untuk manage content
- [ ] Event calendar untuk festival dan workshop
- [ ] User testimonials section

## 👨‍💻 Developer Notes

### Custom Hooks yang Tersedia:

- `useScroll` - Scroll progress tracking
- `useTransform` - Value transformation based on scroll
- `whileInView` - Animate when element in viewport
- `whileHover` - Animate on hover

### Reusable Components:

Semua section di `damar-kurung.tsx` bisa di-extract menjadi komponen terpisah untuk reusability:

- `HeroSection.tsx`
- `PelestarianSection.tsx`
- `PengembanganSection.tsx`
- `PemanfaatanSection.tsx`

### Performance Tips:

- Gunakan `viewport={{ once: true }}` untuk animasi yang hanya run sekali
- Lazy load images dengan `loading="lazy"`
- Optimize SVG dengan tools seperti SVGO
- Minimize bundle size dengan tree-shaking

## 📄 License

This project is part of the G1R1.DK cultural heritage initiative.

## 🙏 Credits

Dibuat dengan ❤️ untuk melestarikan warisan budaya Damar Kurung Gresik.

---

**Cahaya budaya menerangi masa depan** ✨
