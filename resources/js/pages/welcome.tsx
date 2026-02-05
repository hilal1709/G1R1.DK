import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BatikPattern from '@/components/BatikPattern';
import { ArrowRight, Sparkles, Store, Calendar, BookOpen } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang - Damar Kurung Gresik">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                {/* Batik Pattern Overlay */}
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <BatikPattern className="w-full h-full text-amber-900 opacity-[0.05]" />
                </div>

                {/* Navigation */}
                <nav className="relative bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b-2 border-amber-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">DK</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        Damar Kurung
                                    </span>
                                    <span className="block text-xs text-amber-700 font-semibold">Gresik</span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/damar-kurung"
                                    className="text-gray-700 hover:text-amber-600 font-semibold transition-colors"
                                >
                                    Damar Kurung
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="px-6 py-2.5 text-gray-700 hover:text-amber-600 font-semibold transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-bold">Warisan Budaya Gresik</span>
                                </div>

                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                    Damar Kurung
                                    <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                        Gresik
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Melestarikan keindahan seni tradisional melalui kerajinan Damar Kurung berkualitas tinggi.
                                    Setiap produk dibuat dengan penuh cinta dan dedikasi untuk menjaga warisan budaya Indonesia.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                                    >
                                        <Store className="w-5 h-5" />
                                        Lihat Produk
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-600 rounded-xl font-bold hover:shadow-xl transition-all border-2 border-amber-200"
                                    >
                                        Tentang Kami
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Right Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative aspect-square bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/4.png"
                                        alt="Damar Kurung Gresik"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400/20 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="relative py-20 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Jelajahi Platform Kami
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Temukan berbagai fitur yang kami tawarkan untuk pengalaman terbaik Anda
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Store,
                                    title: 'Katalog Produk',
                                    description: 'Jelajahi koleksi lengkap Damar Kurung dengan berbagai desain unik dan tradisional',
                                    link: '/products',
                                    color: 'from-amber-500 to-orange-600'
                                },
                                {
                                    icon: Calendar,
                                    title: 'Event & Workshop',
                                    description: 'Ikuti berbagai acara menarik dan workshop pembuatan Damar Kurung',
                                    link: '/events',
                                    color: 'from-orange-500 to-red-600'
                                },
                                {
                                    icon: BookOpen,
                                    title: 'Artikel & Edukasi',
                                    description: 'Baca artikel menarik tentang sejarah dan budaya Damar Kurung Gresik',
                                    link: '/articles',
                                    color: 'from-red-500 to-pink-600'
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={feature.link}
                                        className="block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group border-2 border-amber-100 hover:border-amber-300"
                                    >
                                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                        <p className="text-gray-600 mb-4">{feature.description}</p>
                                        <div className="inline-flex items-center gap-2 text-amber-600 font-bold group-hover:gap-4 transition-all">
                                            Lihat Selengkapnya
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-12 lg:p-16 text-center shadow-2xl"
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                                Siap Memulai Perjalanan Anda?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Bergabunglah dengan kami untuk melestarikan dan menikmati keindahan Damar Kurung Gresik
                            </p>
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-amber-600 rounded-xl font-bold hover:shadow-xl transition-all"
                                    >
                                        Daftar Sekarang
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border-2 border-white/20"
                                    >
                                        Sudah Punya Akun? Masuk
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                            <div>
                                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">DK</span>
                                    </div>
                                    <span className="text-xl font-bold">Damar Kurung Gresik</span>
                                </div>
                                <p className="text-gray-400">
                                    Melestarikan warisan budaya melalui kerajinan berkualitas tinggi
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4">Navigasi</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/products" className="hover:text-amber-400 transition-colors">Produk</Link></li>
                                    <li><Link href="/events" className="hover:text-amber-400 transition-colors">Event</Link></li>
                                    <li><Link href="/articles" className="hover:text-amber-400 transition-colors">Artikel</Link></li>
                                    <li><Link href="/about" className="hover:text-amber-400 transition-colors">Tentang Kami</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-4">Kontak</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Gresik, Jawa Timur</li>
                                    <li>Indonesia</li>
                                    <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Hubungi Kami</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
                            <p>&copy; {new Date().getFullYear()} Damar Kurung Gresik. Semua hak dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
