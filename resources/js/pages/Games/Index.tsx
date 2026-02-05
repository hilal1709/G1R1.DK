import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';

export default function GamesIndex() {
  const games = [
    {
      title: 'Mewarnai Damar Kurung',
      description: 'Warnai Damar Kurung dengan kreativitas Anda! Pilih warna favorit dan ciptakan karya seni digital.',
      color: 'from-pink-500 to-rose-600',
      href: '/games/mewarnai',
    },
  ];

  return (
    <>
      <Head title="Games - Damar Kurung Gresik" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <PublicNavbar activeMenu="/games" />

        {/* Header */}
        <TraditionalHeader
          title="Games Edukatif"
          subtitle="Belajar tentang Damar Kurung dengan cara yang menyenangkan melalui games interaktif"
          variant="primary"
        />

        {/* Background with Batik Pattern */}
        <div className="relative min-h-screen">
          <div className="absolute inset-0 text-amber-900 opacity-[0.03]">
            <BatikPattern />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {games.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={game.href}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group h-full">
                    <div className={`bg-gradient-to-r ${game.color} p-12 text-center`}>
                      <h2 className="text-3xl font-bold text-white">{game.title}</h2>
                    </div>
                    <div className="p-8">
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {game.description}
                      </p>
                      <div className="flex items-center text-amber-600 font-bold group-hover:translate-x-2 transition-transform">
                        <span>Mainkan Sekarang</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 bg-white rounded-3xl p-12 shadow-lg max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Mengapa Games Edukatif?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Edukatif</h3>
                <p className="text-gray-600">
                  Belajar tentang budaya dan tradisi Damar Kurung dengan cara yang menyenangkan
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interaktif</h3>
                <p className="text-gray-600">
                  Games yang interaktif dan engaging untuk semua usia
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kreatif</h3>
                <p className="text-gray-600">
                  Mengasah kreativitas dan apresiasi terhadap seni tradisional
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 text-lg mb-6">
              Ingin tahu lebih banyak tentang Damar Kurung?
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/about"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Tentang Kami
              </Link>
              <Link
                href="/events"
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-all"
              >
                Ikuti Workshop
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
