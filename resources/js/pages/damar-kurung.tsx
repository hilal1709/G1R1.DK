import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    BookOpen,
    Sparkles,
    TrendingUp,
    Users,
    Award,
    Lightbulb,
    ShoppingBag,
    GraduationCap,
    Heart,
    Building,
    Paintbrush,
    Globe,
} from 'lucide-react';
import { useRef } from 'react';

// Color Palette: Warm Indonesian Heritage dengan aksen modern
// Primary: Amber/Gold (representasi cahaya Damar)
// Secondary: Deep Teal (keanggunan)
// Accent: Coral/Rose (kehangatan budaya)

interface PageProps {
    auth?: {
        user?: any;
    };
}

export default function DamarKurung({ auth }: PageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

    return (
        <>
            <Head title="Damar Kurung Gresik - Warisan Budaya Indonesia" />

            <div
                ref={containerRef}
                className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
            >
                {/* Animated Background Pattern */}
                <motion.div
                    className="fixed inset-0 opacity-10"
                    style={{ y: backgroundY }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.3),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
                </motion.div>

                {/* Navigation */}
                <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex h-16 items-center justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    Damar Kurung Gresik
                                </span>
                            </motion.div>

                            <div className="flex items-center space-x-6">
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                                >
                                    Beranda
                                </Link>
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block mb-4 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2"
                                >
                                    <span className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Warisan Budaya Nusantara
                                    </span>
                                </motion.div>

                                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                                        Damar Kurung
                                    </span>
                                    <br />
                                    <span className="text-gray-800">
                                        Cahaya Budaya Gresik
                                    </span>
                                </h1>

                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Lentera tradisional yang menerangi jejak
                                    sejarah dan identitas budaya Gresik.
                                    Sebuah karya seni yang menggabungkan
                                    estetika, filosofi, dan kearifan lokal
                                    dalam setiap cahayanya.
                                </p>

                                <motion.div
                                    className="flex flex-wrap gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <a
                                        href="#pelestarian"
                                        className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                                    >
                                        <span className="relative z-10">
                                            Jelajahi Sekarang
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                    <a
                                        href="#pemanfaatan"
                                        className="rounded-full border-2 border-amber-500 px-8 py-4 font-semibold text-amber-600 hover:bg-amber-50 transition-all hover:scale-105"
                                    >
                                        Pelajari Lebih Lanjut
                                    </a>
                                </motion.div>
                            </motion.div>

                            {/* Animated Illustration */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="relative"
                            >
                                <div className="relative aspect-square">
                                    {/* Main Lantern */}
                                    <motion.div
                                        animate={{
                                            y: [0, -20, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <div className="relative h-full w-full">
                                            {/* Glow Effect */}
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.5, 0.8, 0.5],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                                className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 blur-3xl"
                                            />

                                            {/* Lantern Body */}
                                            <div className="relative h-full w-full flex items-center justify-center">
                                                <div className="w-3/4 h-3/4 bg-gradient-to-br from-amber-200 via-orange-300 to-amber-400 rounded-3xl shadow-2xl border-8 border-amber-600/30 relative overflow-hidden">
                                                    {/* Pattern */}
                                                    <div className="absolute inset-0 opacity-30">
                                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_60%)]" />
                                                    </div>

                                                    {/* Center Icon */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div
                                                            animate={{
                                                                rotate: 360,
                                                            }}
                                                            transition={{
                                                                duration: 20,
                                                                repeat:
                                                                    Infinity,
                                                                ease: 'linear',
                                                            }}
                                                        >
                                                            <Sparkles className="h-20 w-20 text-white/60" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Particles */}
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: [0, -100, 0],
                                                x: [
                                                    0,
                                                    Math.sin(i) * 50,
                                                    0,
                                                ],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 3 + i,
                                                repeat: Infinity,
                                                delay: i * 0.5,
                                            }}
                                            className="absolute"
                                            style={{
                                                left: `${20 + i * 10}%`,
                                                top: '50%',
                                            }}
                                        >
                                            <Sparkles className="h-4 w-4 text-amber-400" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg
                            viewBox="0 0 1440 120"
                            className="w-full"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2 }}
                                fill="rgba(255, 251, 235, 0.8)"
                                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                            />
                        </svg>
                    </div>
                </section>

                {/* Pelestarian Section */}
                <section
                    id="pelestarian"
                    className="py-20 bg-gradient-to-br from-amber-50/50 to-white relative"
                >
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-4"
                            >
                                <div className="rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 p-4">
                                    <Heart className="h-8 w-8 text-teal-600" />
                                </div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                    Pelestarian
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Menjaga kearifan lokal dan tradisi pembuatan
                                Damar Kurung untuk generasi mendatang
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: 'Pelatihan Pengrajin',
                                    description:
                                        'Program pelatihan intensif untuk regenerasi pengrajin Damar Kurung dengan mentor berpengalaman',
                                    color: 'from-blue-500 to-cyan-500',
                                    bgColor: 'from-blue-50 to-cyan-50',
                                },
                                {
                                    icon: BookOpen,
                                    title: 'Dokumentasi Tradisi',
                                    description:
                                        'Pencatatan lengkap teknik, motif, dan filosofi pembuatan Damar Kurung untuk arsip budaya',
                                    color: 'from-purple-500 to-pink-500',
                                    bgColor: 'from-purple-50 to-pink-50',
                                },
                                {
                                    icon: GraduationCap,
                                    title: 'Edukasi Sekolah',
                                    description:
                                        'Integrasi pembelajaran Damar Kurung dalam kurikulum muatan lokal di sekolah-sekolah',
                                    color: 'from-amber-500 to-orange-500',
                                    bgColor: 'from-amber-50 to-orange-50',
                                },
                                {
                                    icon: Building,
                                    title: 'Pusat Kebudayaan',
                                    description:
                                        'Pembangunan galeri dan workshop center sebagai pusat pelestarian Damar Kurung',
                                    color: 'from-emerald-500 to-teal-500',
                                    bgColor: 'from-emerald-50 to-teal-50',
                                },
                                {
                                    icon: Award,
                                    title: 'Sertifikasi Warisan',
                                    description:
                                        'Upaya pengakuan Damar Kurung sebagai warisan budaya takbenda UNESCO',
                                    color: 'from-rose-500 to-red-500',
                                    bgColor: 'from-rose-50 to-red-50',
                                },
                                {
                                    icon: Globe,
                                    title: 'Komunitas Digital',
                                    description:
                                        'Platform online untuk menghubungkan pengrajin, pecinta budaya, dan peneliti',
                                    color: 'from-indigo-500 to-purple-500',
                                    bgColor: 'from-indigo-50 to-purple-50',
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotateY: 5,
                                    }}
                                    className="group relative"
                                >
                                    <div
                                        className={`h-full rounded-2xl bg-gradient-to-br ${item.bgColor} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100`}
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`mb-6 inline-block rounded-xl bg-gradient-to-br ${item.color} p-3 shadow-lg`}
                                        >
                                            <item.icon className="h-6 w-6 text-white" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Hover Effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pengembangan Section */}
                <section
                    id="pengembangan"
                    className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,182,120,.2)_25%,rgba(68,182,120,.2)_50%,transparent_50%,transparent_75%,rgba(68,182,120,.2)_75%,rgba(68,182,120,.2))] bg-[length:60px_60px]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-4"
                            >
                                <div className="rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 p-4">
                                    <Lightbulb className="h-8 w-8 text-amber-600" />
                                </div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                    Pengembangan
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Inovasi dan modernisasi tanpa meninggalkan
                                nilai-nilai tradisional
                            </p>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: Paintbrush,
                                            title: 'Desain Kontemporer',
                                            description:
                                                'Pengembangan motif dan desain yang memadukan unsur tradisional dengan estetika modern',
                                        },
                                        {
                                            icon: TrendingUp,
                                            title: 'Teknologi Produksi',
                                            description:
                                                'Penerapan teknologi untuk meningkatkan efisiensi tanpa menghilangkan sentuhan tangan',
                                        },
                                        {
                                            icon: Sparkles,
                                            title: 'Material Inovatif',
                                            description:
                                                'Eksplorasi material ramah lingkungan dan tahan lama dengan tetap autentik',
                                        },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 }}
                                            whileHover={{ x: 10 }}
                                            className="flex gap-4 p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 p-3">
                                                    <item.icon className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-400 to-rose-400">
                                        {/* Animated Grid */}
                                        <motion.div
                                            animate={{
                                                backgroundPosition: [
                                                    '0% 0%',
                                                    '100% 100%',
                                                ],
                                            }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: 'linear',
                                            }}
                                            className="absolute inset-0 opacity-20"
                                            style={{
                                                backgroundImage:
                                                    'linear-gradient(rgba(255,255,255,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.1) 2px, transparent 2px)',
                                                backgroundSize: '50px 50px',
                                            }}
                                        />

                                        {/* Center Content */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 5, -5, 0],
                                                }}
                                                transition={{
                                                    duration: 5,
                                                    repeat: Infinity,
                                                }}
                                                className="text-center text-white"
                                            >
                                                <TrendingUp className="h-32 w-32 mx-auto mb-4 opacity-80" />
                                                <p className="text-2xl font-bold">
                                                    Inovasi Berkelanjutan
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {[
                                { number: '50+', label: 'Desain Baru' },
                                { number: '100+', label: 'Pengrajin Terlatih' },
                                { number: '30+', label: 'Workshop' },
                                { number: '15+', label: 'Kolaborasi' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: index * 0.1 + 0.3,
                                            type: 'spring',
                                        }}
                                        className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2"
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-sm text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Pemanfaatan Section */}
                <section
                    id="pemanfaatan"
                    className="py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 relative"
                >
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block mb-4"
                            >
                                <div className="rounded-full bg-gradient-to-br from-rose-100 to-pink-100 p-4">
                                    <ShoppingBag className="h-8 w-8 text-rose-600" />
                                </div>
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                    Pemanfaatan
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Memberdayakan ekonomi kreatif dan pariwisata
                                melalui Damar Kurung
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {[
                                {
                                    title: 'Industri Kreatif',
                                    items: [
                                        'Produk souvenir dan merchandise',
                                        'Dekorasi interior dan event',
                                        'Kolaborasi dengan desainer fashion',
                                        'Ekspor produk ke mancanegara',
                                    ],
                                    icon: ShoppingBag,
                                    gradient:
                                        'from-pink-500 to-rose-500',
                                    bgGradient: 'from-pink-50 to-rose-50',
                                },
                                {
                                    title: 'Pariwisata Budaya',
                                    items: [
                                        'Paket wisata heritage Gresik',
                                        'Festival Damar Kurung tahunan',
                                        'Workshop wisatawan domestik & mancanegara',
                                        'Desa wisata berbasis kerajinan',
                                    ],
                                    icon: Globe,
                                    gradient:
                                        'from-amber-500 to-orange-500',
                                    bgGradient:
                                        'from-amber-50 to-orange-50',
                                },
                            ].map((category, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    whileHover={{ y: -10 }}
                                    className="group"
                                >
                                    <div
                                        className={`h-full rounded-2xl bg-gradient-to-br ${category.bgGradient} p-8 shadow-lg hover:shadow-2xl transition-all`}
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div
                                                className={`rounded-xl bg-gradient-to-br ${category.gradient} p-3 shadow-lg group-hover:scale-110 transition-transform`}
                                            >
                                                <category.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {category.title}
                                            </h3>
                                        </div>

                                        <ul className="space-y-3">
                                            {category.items.map(
                                                (item, itemIndex) => (
                                                    <motion.li
                                                        key={itemIndex}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.2 +
                                                                itemIndex *
                                                                    0.1,
                                                        }}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="mt-1 flex-shrink-0">
                                                            <div className="h-2 w-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                                                        </div>
                                                        <span className="text-gray-700">
                                                            {item}
                                                        </span>
                                                    </motion.li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Economic Impact */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-1 shadow-2xl"
                        >
                            <div className="rounded-3xl bg-white p-8 md:p-12">
                                <div className="grid md:grid-cols-3 gap-8 text-center">
                                    <div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: 'spring',
                                                delay: 0.2,
                                            }}
                                            className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2"
                                        >
                                            500+
                                        </motion.div>
                                        <p className="text-gray-600 font-medium">
                                            Lapangan Kerja
                                        </p>
                                    </div>
                                    <div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: 'spring',
                                                delay: 0.4,
                                            }}
                                            className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent mb-2"
                                        >
                                            5M+
                                        </motion.div>
                                        <p className="text-gray-600 font-medium">
                                            Omzet Tahunan (IDR)
                                        </p>
                                    </div>
                                    <div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: 'spring',
                                                delay: 0.6,
                                            }}
                                            className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2"
                                        >
                                            10K+
                                        </motion.div>
                                        <p className="text-gray-600 font-medium">
                                            Wisatawan/Tahun
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 relative overflow-hidden">
                    {/* Animated Background */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute inset-0 opacity-10"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
                    </motion.div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="inline-block mb-6"
                            >
                                <Sparkles className="h-16 w-16 text-white" />
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Mari Bersama Melestarikan Budaya
                            </h2>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Bergabunglah dengan kami dalam menjaga dan
                                mengembangkan warisan budaya Damar Kurung Gresik
                                untuk masa depan yang lebih cerah
                            </p>

                            <motion.div
                                className="flex flex-wrap justify-center gap-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#"
                                    className="rounded-full bg-white px-8 py-4 text-amber-600 font-bold shadow-xl hover:shadow-2xl transition-all"
                                >
                                    Bergabung Sekarang
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#"
                                    className="rounded-full border-2 border-white px-8 py-4 text-white font-bold hover:bg-white/10 transition-all"
                                >
                                    Pelajari Lebih Lanjut
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-lg font-bold">
                                        Damar Kurung
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Menerangi budaya, mencerahkan masa depan
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold mb-4">Navigasi</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a
                                            href="#pelestarian"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Pelestarian
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#pengembangan"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Pengembangan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#pemanfaatan"
                                            className="text-gray-400 hover:text-amber-400 transition-colors"
                                        >
                                            Pemanfaatan
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold mb-4">Kontak</h3>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>Email: info@damarkurung.id</li>
                                    <li>Telp: +62 812 3456 7890</li>
                                    <li>Gresik, Jawa Timur</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold mb-4">
                                    Media Sosial
                                </h3>
                                <div className="flex gap-3">
                                    {['FB', 'IG', 'TW', 'YT'].map((social) => (
                                        <motion.a
                                            key={social}
                                            whileHover={{ scale: 1.1 }}
                                            href="#"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold hover:bg-gradient-to-br hover:from-amber-400 hover:to-orange-500 transition-all"
                                        >
                                            {social}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                            <p>
                                © 2025 Damar Kurung Gresik. Seluruh hak cipta
                                dilindungi.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
