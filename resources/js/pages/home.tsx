import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import BatikPattern from '@/components/BatikPattern';
import FloatingLanterns from '@/components/FloatingLanterns';
import AnimatedCounter from '@/components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  image: string;
  stok: number;
  category: string | null;
}

interface Event {
  id: number;
  nama: string;
  deskripsi: string;
  lokasi: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  image: string;
  max_pendaftar: number;
  registered_participants: number;
}

interface Article {
  id: number;
  judul: string;
  excerpt: string;

  image: string;

  author: string;
}

interface HomeProps {
  products: Product[];
  events: Event[];
  articles: Article[];
}

export default function Home({ products, events, articles }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const homeNavRef = useRef<HTMLElement>(null);

  const heroSlides = [
    {
      title: "Damar Kurung Gresik",
      subtitle: "Warisan Budaya Indonesia",
      description: "Lentera tradisional yang menerangi keindahan seni dan budaya nusantara",
      image: "/images/hero-1.jpg",
      cta: "Jelajahi Produk",
      ctaLink: "/products"
    },
    {
      title: "Kerajinan Berkualitas",
      subtitle: "Dibuat Dengan Tangan Terampil",
      description: "Setiap produk adalah karya seni yang dibuat dengan dedikasi dan keahlian tinggi",
      image: "/images/hero-2.jpg",
      cta: "Lihat Katalog",
      ctaLink: "/products"
    },
    {
      title: "UMKM Lokal",
      subtitle: "Memberdayakan Ekonomi Kreatif",
      description: "Mendukung pengrajin lokal untuk terus berkarya dan berinovasi",
      image: "/images/hero-3.jpg",
      cta: "Tentang Kami",
      ctaLink: "#tentang"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY > 80;
    if (scrollPosition !== scrolled) {
      setScrolled(scrollPosition);
    }
  }, [scrolled]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // GSAP entry: animate home nav in on load
  useEffect(() => {
    if (homeNavRef.current) {
      gsap.fromTo(homeNavRef.current, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
  }, []);

  // GSAP ScrollTrigger: reveal sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings
      gsap.utils.toArray<HTMLElement>('.gsap-section-heading').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Cards stagger
      gsap.utils.toArray<HTMLElement>('.gsap-cards-grid').forEach((grid) => {
        const cards = grid.querySelectorAll('.gsap-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      // Left/right reveal for about section
      gsap.fromTo('.gsap-slide-left', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-slide-left', start: 'top 82%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.gsap-slide-right', { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.gsap-slide-right', start: 'top 82%', toggleActions: 'play none none none' },
      });
    });

    return () => ctx.revert();
  }, []);

  // anime.js: CTA button pulse on hover (applied globally)
  useEffect(() => {
    const btns = document.querySelectorAll('.anime-cta-btn');
    btns.forEach((btn) => {
      (btn as HTMLElement).addEventListener('mouseenter', () => {
        animate(btn as HTMLElement, { scale: [1, 1.06, 1], duration: 380, ease: 'outElastic(1, .8)' });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav
        ref={homeNavRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-amber-100"
            : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center ring-2 ring-white/30 group-hover:ring-amber-400 transition-all duration-200">
                <img
                  src="/images/giri-dk-logo-o.PNG"
                  alt="Damar Kurung Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className={`text-base font-bold transition-colors ${scrolled ? 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent' : 'text-white'}`}>
                  Damar Kurung
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-medium ${scrolled ? 'text-gray-400' : 'text-white/60'}`}>
                  Gresik
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: '#beranda', label: 'Beranda' },
                { href: '#tentang', label: 'Tentang' },
                { href: '#produk', label: 'Produk' },
                { href: '#event', label: 'Event' },
                { href: '#artikel', label: 'Artikel' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:text-amber-400 ${
                    scrolled ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/60' : 'text-white'
                  }`}
                >
                  {label}
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <a
                href="/login"
                className={`hidden sm:inline-block px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  scrolled
                    ? "text-amber-600 border-2 border-amber-500 hover:bg-amber-50"
                    : "text-white border-2 border-white/60 hover:bg-white/10"
                }`}
              >
                Masuk
              </a>
              <a
                href="/register"
                className="anime-cta-btn px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl hover:from-amber-600 hover:to-orange-700 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-200"
              >
                Daftar
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Floating lanterns anime.js background */}
        <FloatingLanterns count={20} />

        {heroSlides.map((slide, index) => (
          <div key={index} className="absolute inset-0 flex items-center justify-center transition-all duration-700" style={{ opacity: currentSlide === index ? 1 : 0, transform: currentSlide === index ? 'scale(1)' : 'scale(1.1)', pointerEvents: currentSlide === index ? 'auto' : 'none' }}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <div className="max-w-3xl">
                <p className="text-amber-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4 tracking-wider">
                  {slide.subtitle}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="anime-cta-btn inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:shadow-2xl transition-all text-center"
                  >
                    {slide.cta}
                  </Link>
                  <a
                    href="#tentang"
                    className="anime-cta-btn bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-white/30 transition-all text-center"
                  >
                    Pelajari Lebih Lanjut
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-amber-500 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section id="tentang" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-heading text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Profil <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Perusahaan</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Melestarikan tradisi, mengembangkan inovasi, dan memanfaatkan teknologi untuk kemajuan UMKM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="gsap-slide-left space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Tentang Kami</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Damar Kurung Gresik adalah UMKM yang bergerak dalam bidang kerajinan lentera tradisional khas Gresik.
                Kami telah berdiri sejak tahun 1995 dan terus berkembang hingga saat ini, memproduksi berbagai jenis
                damar kurung dengan kualitas terbaik.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan menggabungkan teknik tradisional dan sentuhan modern, kami menghadirkan produk yang tidak hanya
                indah dipandang, tetapi juga memiliki nilai budaya yang tinggi.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    <AnimatedCounter target={28} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Tahun Berpengalaman</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    <AnimatedCounter target={5000} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Produk Terjual</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    <AnimatedCounter target={50} suffix="+" />
                  </div>
                  <div className="text-gray-600 text-sm">Pengrajin</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    <AnimatedCounter target={100} suffix="%" />
                  </div>
                  <div className="text-gray-600 text-sm">Handmade</div>
                </div>
              </div>
            </div>

            <div className="gsap-slide-right relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/profile.jpg"
                  alt="Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Damar Kurung Section */}
      <section id="sejarah" className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 text-amber-900 opacity-[0.03]">
          <BatikPattern />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sejarah <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Damar Kurung</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Menelusuri jejak tradisi lentera nusantara yang telah ada sejak zaman kerajaan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="gsap-slide-left space-y-6">
              <div className="prose prose-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Asal Usul</h3>
                <p className="text-gray-600 leading-relaxed">
                  Damar Kurung adalah lentera tradisional yang berasal dari Gresik, Jawa Timur.
                  Lentera ini telah ada sejak zaman Kerajaan Majapahit dan menjadi bagian penting
                  dalam berbagai upacara adat dan perayaan keagamaan.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Kata "Damar" berarti lampu atau penerangan, sedangkan "Kurung" berarti dikurung
                  atau dibungkus. Secara harfiah, Damar Kurung berarti lampu yang dikurung dalam
                  bingkai kayu dengan hiasan kertas warna-warni.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Fungsi Tradisional</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Penerangan saat perayaan keagamaan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Dekorasi dalam acara pernikahan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Simbol kemakmuran dan kebahagiaan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Media dakwah dan pendidikan</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="gsap-slide-right space-y-6">
              {/* Video Profil */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gray-900 relative group">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/xLIGnDM785s"
                    title="Video Profil Damar Kurung"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="bg-white p-4">
                  <h4 className="font-bold text-lg text-gray-900">Video Profil Damar Kurung</h4>
                  <p className="text-gray-600 text-sm">Mengenal lebih dekat keindahan dan proses pembuatan Damar Kurung</p>
                </div>
              </div>

              {/* Video Sejarah */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gray-900 relative group">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/lwTiPHIGIws"
                    title="Sejarah Damar Kurung"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="bg-white p-4">
                  <h4 className="font-bold text-lg text-gray-900">Sejarah & Filosofi</h4>
                  <p className="text-gray-600 text-sm">Menelusuri jejak sejarah panjang Damar Kurung di Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Edukasi Section
          <div className="mt-16">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              Video <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Edukasi</span>
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Cara Membuat Damar Kurung", desc: "Tutorial lengkap pembuatan dari awal hingga akhir" },
                { title: "Teknik Pewarnaan", desc: "Mempelajari teknik pewarnaan tradisional" },
                { title: "Motif & Ornamen", desc: "Mengenal berbagai motif dan maknanya" }
              ].map((video, index) => (
                <div className="gsap-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="aspect-video bg-gray-200 relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{video.title}</h4>
                    <p className="text-gray-600 text-sm">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>*/}
        </div>
      </section>

      {/* Profile Produk Section */}
      <section id="produk" className="relative py-20 bg-white">
        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 text-amber-900 opacity-[0.02]">
          <BatikPattern />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Profile <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Produk</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Koleksi Damar Kurung terbaik dengan berbagai ukuran dan desain
            </p>
          </div>

          <div className="gsap-cards-grid grid md:grid-cols-3 gap-8 mb-12">
            {products && products.length > 0 ? (
              products.slice(0, 6).map((product, index) => (
                <div key={product.id} className="gsap-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.nama}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f59e0b" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EProduk%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.nama}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.deskripsi}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-600">
                          Rp {Number(product.harga).toLocaleString('id-ID')}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada produk tersedia</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Lihat Semua Produk →
            </Link>
          </div>
        </div>
      </section>


      {/* Artikel Section */}
      <section id="artikel" className="relative py-20 bg-gray-50">
        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 text-amber-900 opacity-[0.02]">
          <BatikPattern />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Artikel <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Terbaru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bacaan menarik seputar Damar Kurung, budaya, dan kegiatan kreatif
            </p>
          </div>

          <div className="gsap-cards-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles && articles.length > 0 ? (
              articles.map((article, index) => (
                <div key={article.id} className="gsap-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.judul}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/images/article-placeholder.jpg';
                      }}
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.judul}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">
                        ✍️ {article.author}
                      </span>

                      <Link
                        href={`/articles/${article.id}`}
                        className="text-amber-600 font-semibold hover:text-orange-600 transition-colors"
                      >
                        Baca Selengkapnya →
                      </Link>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada artikel tersedia</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/articles"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Lihat Semua Artikel →
            </Link>
          </div>
        </div>
      </section>


      {/* Event Section */}
      <section id="event" className="relative py-20 bg-white">
        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 text-amber-900 opacity-[0.02]">
          <BatikPattern />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-section-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Event <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Terbaru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ikuti berbagai event dan workshop menarik seputar Damar Kurung
            </p>
          </div>

          <div className="gsap-cards-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events && events.length > 0 ? (
              events.slice(0, 3).map((event, index) => (
                <div key={event.id} className="gsap-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.nama}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2334d399" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EEvent%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Mendatang
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.nama}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(event.tanggal_mulai).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} - {new Date(event.tanggal_mulai).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.lokasi}</span>
                      </div>
                      {event.max_pendaftar > 0 && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{event.registered_participants} / {event.max_pendaftar} peserta</span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="block w-full text-center bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada event tersedia</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Lihat Semua Event →
            </Link>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src="/images/giri-dk-logo-o.PNG"
                    alt="Damar Kurung Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-2xl font-bold">Damar Kurung Gresik</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Melestarikan warisan budaya Indonesia melalui kerajinan Damar Kurung berkualitas tinggi.
                Dibuat dengan tangan terampil dan dedikasi penuh.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/damarkurung.gresik?igsh=bmo2N2xrd3Jlb2Rx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://wa.me/6281234043044" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.520.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@damar.kurung.gres?_r=1&_t=ZS-93DUdjZi24Y" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Link Cepat</h3>
              <ul className="space-y-2">
                <li><a href="#beranda" className="text-gray-400 hover:text-amber-500 transition-colors">Beranda</a></li>
                <li><a href="#tentang" className="text-gray-400 hover:text-amber-500 transition-colors">Tentang Kami</a></li>
                <li><a href="#produk" className="text-gray-400 hover:text-amber-500 transition-colors">Produk</a></li>
                <li><a href="#event" className="text-gray-400 hover:text-amber-500 transition-colors">Event</a></li>
                <li><a href="#artikel" className="text-gray-400 hover:text-amber-500 transition-colors">Artikel</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Kontak Kami</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Jl. Usman Sadar Gg. XVII No.15
                      <br />Ngipik, Sukorame, Kec. Gresik
                      <br />Kabupaten Gresik, Jawa Timur 61116</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+62 812-3404-3044</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@damarkurung.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Damar Kurung Gresik. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-amber-500 transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
