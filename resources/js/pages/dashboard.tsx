import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { PageProps } from '@/types';
import {
    FileText,
    Calendar,
    ShoppingBag,
    Users,
    Eye,
    Gamepad2,
    ArrowRight,
    Sparkles,
    Plus,
    Edit,
    Trash2,
} from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';

interface Stats {
    total_articles: number;
    total_events: number;
    total_products: number;
    total_users: number;
    active_events: number;
}

interface Article {
    id: number;
    judul: string;
    excerpt: string;
    author: string;
    image: string;
    date: string;
}

interface Event {
    id: number;
    nama: string;
    tanggal_mulai: string;      // misal: '18 Jan 2026 10:00'
    tanggal_selesai: string;
    registered_participants: number;
    max_pendaftar: number;
    image: string;
}

interface Product {
    id: number;
    nama: string;
    harga: number;
    stok: number;
    image: string;
}


interface DashboardProps extends PageProps {
    stats: Stats;
    recentArticles: Article[];
    upcomingEvents: Event[];
    featuredProducts: Product[];
}

export default function Dashboard({ auth, stats, recentArticles, upcomingEvents, featuredProducts }: DashboardProps) {
    const isAdmin = auth.user?.role === 'admin';

    const statCards = [
        {
            label: 'Total Artikel',
            value: stats.total_articles.toString(),
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
        },
        {
            label: 'Event Aktif',
            value: stats.active_events.toString(),
            icon: Calendar,
            color: 'from-green-500 to-green-600',
        },
        {
            label: 'Produk',
            value: stats.total_products.toString(),
            icon: ShoppingBag,
            color: 'from-amber-500 to-orange-600',
        },
        {
            label: 'Total Pengguna',
            value: stats.total_users.toString(),
            icon: Users,
            color: 'from-purple-500 to-purple-600',
        },
    ];

    return (
        <>
            <Head title="Dashboard - Beranda" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/dashboard" />

                {/* Welcome Section */}
                <TraditionalHeader
                    title="Dashboard Damar Kurung Gresik"
                    subtitle="Kelola artikel, event, produk, dan games untuk melestarikan budaya Damar Kurung"
                    variant="primary"
                />

                {/* Background with Batik Pattern */}
                <div className="relative min-h-screen">
                    <div className="absolute inset-0 text-amber-900 opacity-[0.02]">
                        <BatikPattern />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Stats Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3 shadow-md`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Access Menu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Menu Cepat</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Link
                                href="/articles"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-blue-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-blue-100 p-3">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Artikel</h3>
                                <p className="text-sm text-gray-600">
                                    Baca dan kelola artikel tentang Damar Kurung
                                </p>
                            </Link>

                            <Link
                                href="/events"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-green-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-green-100 p-3">
                                        <Calendar className="h-6 w-6 text-green-600" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Event</h3>
                                <p className="text-sm text-gray-600">
                                    Workshop, festival, dan kegiatan lainnya
                                </p>
                            </Link>

                            <Link
                                href="/products"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-amber-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-amber-100 p-3">
                                        <ShoppingBag className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Produk</h3>
                                <p className="text-sm text-gray-600">
                                    Katalog produk Damar Kurung berkualitas
                                </p>
                            </Link>

                            <Link
                                href="/games"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-purple-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-purple-100 p-3">
                                        <Gamepad2 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Games</h3>
                                <p className="text-sm text-gray-600">
                                    Games edukatif tentang budaya Nusantara
                                </p>
                            </Link>

                            <Link
                                href="/about"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-indigo-100 p-3">
                                        <Users className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Tentang Kami</h3>
                                <p className="text-sm text-gray-600">
                                    Profil dan sejarah UMKM Damar Kurung
                                </p>
                            </Link>

                            <Link
                                href="/contact"
                                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-all hover:shadow-xl hover:border-pink-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="rounded-lg bg-pink-100 p-3">
                                        <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Kontak</h3>
                                <p className="text-sm text-gray-600">
                                    Hubungi kami untuk informasi lebih lanjut
                                </p>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Content Management Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Kelola Konten</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Manage Articles */}
                            <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="rounded-lg bg-blue-100 p-3">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Artikel</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Kelola artikel dan konten edukatif
                                </p>
                                <div className="space-y-2">
                                    <Link
                                        href="/articles/create"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Buat Artikel
                                    </Link>
                                    <Link
                                        href="/articles"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Kelola Artikel
                                    </Link>
                                </div>
                            </div>

                            {/* Manage Events */}
                            <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="rounded-lg bg-green-100 p-3">
                                        <Calendar className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Event</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Kelola workshop dan kegiatan
                                </p>
                                <div className="space-y-2">
                                    <Link
                                        href="/events/create"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Buat Event
                                    </Link>
                                    <Link
                                        href="/events"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Kelola Event
                                    </Link>
                                </div>
                            </div>

                            {/* Manage Products */}
                            <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="rounded-lg bg-amber-100 p-3">
                                        <ShoppingBag className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Produk</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Kelola katalog produk
                                </p>
                                <div className="space-y-2">
                                    <Link
                                        href="/products/create"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Buat Produk
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Kelola Produk
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Recent Articles Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Artikel Terbaru</h2>
                            <Link href="/articles" className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2">
                                Lihat Semua
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {recentArticles && recentArticles.length > 0 ? (
                                recentArticles.map((article) => (
                                <div key={article.id} className="rounded-xl border border-amber-100 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <img
                                        src={article.image}
                                        alt={article.judul}
                                        className="h-40 w-full object-cover"
                                        onError={(e) => { e.currentTarget.src = '/images/article-placeholder.jpg'; }}
                                    />
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.judul}</h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> views
                                            </span>
                                            <span>{article.date}</span>
                                        </div>
                                    </div>
                                </div>

                            ))
                            ) : (
                                <div className="col-span-3 text-center py-12 text-gray-500">
                                    Belum ada artikel tersedia
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Upcoming Events Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Event Mendatang</h2>
                            <Link href="/events" className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2">
                                Lihat Semua
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {upcomingEvents && upcomingEvents.length > 0 ? (
                                upcomingEvents.map((event) => (
                                <div key={event.id} className="rounded-xl border border-amber-100 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                    <img
                                        src={event.image}
                                        alt={event.nama}
                                        className="h-40 w-full object-cover"
                                        onError={(e) => { e.currentTarget.src = '/images/event-placeholder.jpg'; }}
                                    />
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 mb-2">{event.nama}</h3>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" /> {event.tanggal_mulai}
                                            </span>
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <Users className="w-4 h-4" /> {event.registered_participants}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <div className="col-span-3 text-center py-12 text-gray-500">
                                    Belum ada event tersedia
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Featured Products Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Produk Unggulan</h2>
                            <Link href="/products" className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2">
                                Lihat Semua
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {featuredProducts && featuredProducts.length > 0 ? (
                                featuredProducts.map((product) => (
                                    <div key={product.id} className="rounded-xl border border-amber-100 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.nama}
                                                className="h-40 w-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f59e0b" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="48" text-anchor="middle" x="200" y="220"%3EProduk%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        ) : (
                                            <div className="h-40 bg-gradient-to-br from-amber-400 to-orange-500" />
                                        )}
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 mb-2">
                                            {product.nama}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-amber-600">
                                                Rp {product.harga.toLocaleString('id-ID')}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {/*product.sold*/} terjual
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <div className="col-span-3 text-center py-12 text-gray-500">
                                    Belum ada produk tersedia
                                </div>
                            )}
                        </div>
                    </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
