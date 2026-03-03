import { motion } from 'framer-motion';
import { Link, Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import TraditionalHeader from '@/components/TraditionalHeader';
import { ShoppingBag, ArrowRight, Eye } from 'lucide-react';

interface Order {
    id: number;
    order_number: string;
    total: number;
    status: string;
    created_at: string;
}

interface Props {
    orders: Order[];
}

const statusLabel: Record<string, { label: string; color: string }> = {
    menunggu_pembayaran: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800' },
    menunggu_verifikasi: { label: 'Menunggu Verifikasi', color: 'bg-blue-100 text-blue-800' },
    diproses:            { label: 'Diproses',            color: 'bg-indigo-100 text-indigo-800' },
    dikirim:             { label: 'Dikirim',             color: 'bg-purple-100 text-purple-800' },
    selesai:             { label: 'Selesai',             color: 'bg-green-100 text-green-800' },
    dibatalkan:          { label: 'Dibatalkan',          color: 'bg-red-100 text-red-800' },
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export default function OrdersIndex({ orders }: Props) {
    return (
        <>
            <Head title="Pesanan Saya" />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="orders" />

                <TraditionalHeader
                    title="Pesanan Saya"
                    subtitle="Pantau semua riwayat pesanan Anda"
                    variant="primary"
                />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-amber-50 to-orange-50">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Semua Pesanan
                                <span className="ml-2 text-sm font-normal text-gray-400">({orders.length})</span>
                            </h2>
                            <Link
                                href="/user-dashboard"
                                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>

                        {orders.length > 0 ? (
                            <>
                                {/* Desktop table */}
                                <div className="hidden md:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100 bg-gray-50/50">
                                                <th className="text-left px-6 py-3 font-medium">Order</th>
                                                <th className="text-left px-6 py-3 font-medium">Tanggal</th>
                                                <th className="text-right px-6 py-3 font-medium">Total</th>
                                                <th className="text-center px-6 py-3 font-medium">Status</th>
                                                <th className="text-center px-6 py-3 font-medium">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {orders.map((order, i) => {
                                                const s = statusLabel[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-700' };
                                                return (
                                                    <motion.tr
                                                        key={order.id}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                                        className="hover:bg-amber-50/40 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 font-medium text-gray-800">#{order.order_number}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(order.created_at)}</td>
                                                        <td className="px-6 py-4 text-right font-semibold text-gray-700">{formatPrice(order.total)}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <Link
                                                                href={`/orders/${order.id}`}
                                                                className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium border border-amber-200 hover:border-amber-400 rounded-lg px-3 py-1.5 transition-colors"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" /> Detail
                                                            </Link>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile cards */}
                                <div className="md:hidden divide-y divide-gray-50">
                                    {orders.map((order, i) => {
                                        const s = statusLabel[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-700' };
                                        return (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                className="px-5 py-4"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <p className="font-medium text-gray-800">#{order.order_number}</p>
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-xs text-gray-400">{formatDate(order.created_at)}</p>
                                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{formatPrice(order.total)}</p>
                                                    </div>
                                                    <Link
                                                        href={`/orders/${order.id}`}
                                                        className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium border border-amber-200 rounded-lg px-3 py-1.5"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" /> Detail
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 text-gray-400">
                                <ShoppingBag className="w-14 h-14 mx-auto mb-3 opacity-25" />
                                <p className="font-medium text-gray-500 text-lg">Belum ada pesanan</p>
                                <p className="text-sm mt-1">Yuk, mulai belanja produk Damar Kurung!</p>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 mt-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    Lihat Produk <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
