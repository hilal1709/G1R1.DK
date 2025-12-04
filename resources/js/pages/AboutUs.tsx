import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function AboutUs() {
  const team = [
    {
      name: 'Bapak Sutrisno',
      role: 'Founder & Master Craftsman',
      description: 'Pengrajin Damar Kurung dengan pengalaman lebih dari 30 tahun',
    },
    {
      name: 'Ibu Siti Aminah',
      role: 'Creative Director',
      description: 'Mendesain motif-motif modern yang memadukan tradisi dan inovasi',
    },
    {
      name: 'Ahmad Yusuf',
      role: 'Production Manager',
      description: 'Mengawasi kualitas produksi dan standar kerajinan',
    },
    {
      name: 'Dewi Lestari',
      role: 'Marketing & Community',
      description: 'Mengelola hubungan dengan pelanggan dan komunitas',
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Kualitas Terjamin',
      description: 'Setiap produk dibuat dengan teliti menggunakan bahan berkualitas tinggi',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Warisan Budaya',
      description: 'Melestarikan seni tradisional Damar Kurung Gresik untuk generasi mendatang',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Inovasi Berkelanjutan',
      description: 'Mengembangkan desain baru sambil tetap mempertahankan nilai tradisional',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Pemberdayaan UMKM',
      description: 'Melatih dan memberdayakan pengrajin lokal untuk meningkatkan ekonomi',
    },
  ];

  const milestones = [
    { year: '1990', event: 'Berdirinya usaha kerajinan Damar Kurung pertama di Gresik' },
    { year: '2005', event: 'Mendapat penghargaan dari Pemerintah Daerah untuk pelestarian budaya' },
    { year: '2010', event: 'Ekspansi pasar ke seluruh Jawa Timur dan Jawa Tengah' },
    { year: '2015', event: 'Meluncurkan koleksi modern dengan desain kontemporer' },
    { year: '2020', event: 'Membuka platform online untuk menjangkau pasar nasional' },
    { year: '2025', event: 'Ekspor produk ke berbagai negara Asia dan Eropa' },
  ];

  return (
    <>
      <Head title="Tentang Kami - Damar Kurung Gresik" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DK</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Damar Kurung
                </span>
              </Link>

              <div className="flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-amber-600">Beranda</Link>
                <Link href="/products" className="text-gray-700 hover:text-amber-600">Produk</Link>
                <Link href="/events" className="text-gray-700 hover:text-amber-600">Event</Link>
                <Link href="/about" className="text-amber-600 font-semibold">Tentang</Link>
                <Link href="/contact" className="text-gray-700 hover:text-amber-600">Kontak</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Tentang Damar Kurung Gresik
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 max-w-3xl mx-auto"
            >
              Melestarikan warisan budaya melalui kerajinan Damar Kurung berkualitas tinggi
            </motion.p>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Damar Kurung Gresik didirikan pada tahun 1990 dengan visi untuk melestarikan seni tradisional
                  pembuatan Damar Kurung yang telah ada sejak zaman kerajaan Majapahit.
                </p>
                <p>
                  Berawal dari sebuah workshop kecil di Gresik, kami telah berkembang menjadi salah satu
                  produsen Damar Kurung terkemuka di Indonesia. Setiap produk kami dibuat dengan tangan
                  oleh pengrajin berpengalaman yang telah mewarisi keahlian turun-temurun.
                </p>
                <p>
                  Kami tidak hanya memproduksi Damar Kurung, tetapi juga aktif dalam program pelatihan
                  dan pemberdayaan masyarakat lokal. Dengan membuka workshop dan kelas, kami berharap
                  dapat meneruskan tradisi ini kepada generasi muda.
                </p>
                <p>
                  Saat ini, produk kami telah tersebar di seluruh Indonesia dan bahkan diekspor ke berbagai
                  negara. Kami terus berinovasi dengan menciptakan desain-desain baru yang memadukan
                  unsur tradisional dengan sentuhan modern.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Perjalanan Kami</h2>
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-orange-600" />
                    <div className="pl-8 pb-8">
                      <div className="bg-white rounded-xl p-6 shadow-lg">
                        <p className="text-gray-800 text-lg">{milestone.event}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Tim Kami</h2>
            <p className="text-gray-600 text-center text-lg mb-12 max-w-2xl mx-auto">
              Kenali orang-orang di balik kerajinan Damar Kurung yang berkualitas tinggi
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 text-white"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">35+</div>
                <div className="text-white/80 text-lg">Tahun Pengalaman</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5000+</div>
                <div className="text-white/80 text-lg">Produk Terjual</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-white/80 text-lg">Pengrajin Terlatih</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">10+</div>
                <div className="text-white/80 text-lg">Negara Ekspor</div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Tertarik Bekerja Sama dengan Kami?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang produk, pelatihan, atau kerjasama bisnis
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/products"
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-all"
              >
                Lihat Produk
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
