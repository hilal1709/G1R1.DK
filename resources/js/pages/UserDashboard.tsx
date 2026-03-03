import { motion } from 'framer-motion';
import { Link, Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import TraditionalHeader from '@/components/TraditionalHeader';
import {
    ShoppingBag,
    Clock,
    CheckCircle,
    Truck,
    Package,
    ArrowRight,
} from 'lucide-react';

interface Order {
    id: number;
    order_number: string;
    total: number;
    status: string;
    created_at: string;
}

interface Props {
    totalOrders: number;
    menungguPembayaran: number;
    menungguVerifikasi: number;
    dikirim: number;
    selesai: number;
    recentOrders: Order[];
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
}

const statusLabel: Record<string, { label: string; color: string }> = {
    menunggu_pembayaran: {
        label: 'Menunggu Pembayaran',
        color: 'bg-yellow-100 text-yellow-800',
    },
    menunggu_verifikasi: {
        label: 'Menunggu Verifikasi',
        color: 'bg-blue-100 text-blue-800',
    },
    dikirim: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800' },
    selesai: { label: 'Selesai', color: 'bg-green-100 text-green-800' },
    dibatalkan: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

export default function UserDashboard({
    totalOrders,
    menungguPembayaran,
    menungguVerifikasi,
    dikirim,
    selesai,
    recentOrders,
    auth,
}: Props) {
    const stats = [
        {
            label: 'Total Pesanan',
            value: totalOrders,
            icon: ShoppingBag,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
        },
        {
            label: 'Menunggu Pembayaran',
            value: menungguPembayaran,
            icon: Clock,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
        },
        {
            label: 'Menunggu Verifikasi',
            value: menungguVerifikasi,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
        },
        {
            label: 'Dikirim',
            value: dikirim,
            icon: Truck,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
        },
        {
            label: 'Selesai',
            value: selesai,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-200',
        },
    ];

    return (
        <>
            <Head title="Dashboard Saya" />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="dashboard" />

                <TraditionalHeader
                    title={`Halo, ${auth?.user?.name ?? 'Member'}!`}
                    subtitle="Selamat datang di dashboard pribadi Anda"
                    variant="primary"
                />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Stats cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
                    >
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                                    className={`rounded-2xl border ${stat.border} ${stat.bg} p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Recent orders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden mb-6"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-amber-50 to-orange-50">
                            <h2 className="text-lg font-semibold text-gray-800">5 Pesanan Terbaru</h2>
                            <Link
                                href="/orders"
                                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                            >
                                Lihat Semua <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {recentOrders.length > 0 ? (
                            <div className="divide-y divide-orange-50">
                                {recentOrders.map((order, i) => {
                                    const s = statusLabel[order.status] ?? {
                                        label: order.status,
                                        color: 'bg-gray-100 text-gray-700',
                                    };
                                    return (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-amber-50/50 transition-colors"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-800 truncate">
                                                    #{order.order_number}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 ml-4 shrink-0">
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {formatPrice(order.total)}
                                                </p>
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>
                                                    {s.label}
                                                </span>
                                                <Link
                                                    href={`/orders/${order.id}`}
                                                    className="text-xs text-amber-600 hover:text-amber-700 font-medium border border-amber-200 hover:border-amber-400 rounded-lg px-3 py-1.5 transition-colors"
                                                >
                                                    Detail
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-400">
                                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p className="font-medium text-gray-500">Belum ada pesanan</p>
                                <p className="text-sm mt-1">Yuk, mulai belanja produk Damar Kurung!</p>
                                <Link
                                    href="/products"
                                    className="inline-block mt-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    Lihat Produk
                                </Link>
                            </div>
                        )}
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                        {[
                            { label: 'Semua Pesanan', href: '/orders', icon: ShoppingBag },
                            { label: 'Produk', href: '/products', icon: Package },
                            { label: 'Event', href: '/events', icon: CheckCircle },
                            { label: 'Artikel', href: '/articles', icon: ArrowRight },
                        ].map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-3 bg-white rounded-2xl border border-orange-100 shadow-sm px-5 py-4 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all"
                                >
                                    <Icon className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span className="text-sm font-medium text-gray-700">{link.label}</span>
                                </Link>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
