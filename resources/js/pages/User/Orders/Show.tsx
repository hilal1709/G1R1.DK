import { motion } from 'framer-motion';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import TraditionalHeader from '@/components/TraditionalHeader';
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    MessageCircle,
    Upload,
    ArrowLeft,
    Receipt,
    MapPin,
    Phone,
} from 'lucide-react';

interface OrderDetail {
    id: number;
    qty: number;
    harga: number;
    product: {
        id: number;
        nama: string;
    } | null;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    subtotal: number;
    ongkir: number;
    total: number;
    nama_penerima: string;
    no_wa: string;
    alamat: string;
    ekspedisi: string;
    bukti_transfer: string | null;
    dibayar_pada: string | null;
    resi: string | null;
    dikirim_pada: string | null;
    created_at: string;
    details: OrderDetail[];
}

interface Props {
    order: Order;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    menunggu_pembayaran: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
    menunggu_verifikasi: { label: 'Menunggu Verifikasi', color: 'bg-blue-100 text-blue-800 border-blue-200',   icon: Clock },
    diproses:            { label: 'Diproses',            color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Package },
    dikirim:             { label: 'Dikirim',             color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Truck },
    selesai:             { label: 'Selesai',             color: 'bg-green-100 text-green-800 border-green-200',  icon: CheckCircle },
    dibatalkan:          { label: 'Dibatalkan',          color: 'bg-red-100 text-red-800 border-red-200',       icon: Package },
};

const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const formatDate = (dateStr: string | null) =>
    dateStr
        ? new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : '-';

export default function OrderShow({ order }: Props) {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const s = statusConfig[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Package };
    const StatusIcon = s.icon;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        if (f) setPreview(URL.createObjectURL(f));
    };

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('bukti_transfer', file);
        router.post(`/transactions/${order.id}/upload`, formData, {
            onFinish: () => setUploading(false),
        });
    };

    const waMessage = encodeURIComponent(
        `Halo Admin,\n\nSaya ingin konfirmasi pesanan:\nOrder: ${order.order_number}\nStatus: ${s.label}\nTotal: ${formatPrice(order.total)}\n\nMohon dibantu ya 🙏`
    );

    return (
        <>
            <Head title={`Pesanan #${order.order_number}`} />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="orders" />

                <TraditionalHeader
                    title={`Pesanan #${order.order_number}`}
                    subtitle="Detail informasi pesanan Anda"
                    variant="primary"
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

                    {/* Back + Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <Link
                            href="/orders"
                            className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Pesanan
                        </Link>
                        <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full font-medium border ${s.color}`}>
                            <StatusIcon className="w-4 h-4" /> {s.label}
                        </span>
                    </motion.div>

                    {/* Order items */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center gap-2">
                            <Package className="w-5 h-5 text-amber-600" />
                            <h2 className="font-semibold text-gray-800">Produk Pesanan</h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.details.map((d) => (
                                <div key={d.id} className="flex justify-between items-center px-6 py-4">
                                    <p className="text-gray-700 font-medium">{d.product?.nama ?? 'Produk dihapus'}</p>
                                    <div className="text-right shrink-0 ml-4">
                                        <p className="text-sm text-gray-500">{d.qty} × {formatPrice(d.harga)}</p>
                                        <p className="font-semibold text-gray-800">{formatPrice(d.qty * d.harga)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 border-t border-orange-100 bg-orange-50/40 space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Ongkos Kirim ({order.ekspedisi || '-'})</span><span>{formatPrice(order.ongkir)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-orange-100">
                                <span>Total</span><span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Shipping info */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-amber-600" />
                            <h2 className="font-semibold text-gray-800">Informasi Pengiriman</h2>
                        </div>
                        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Nama Penerima</p>
                                <p className="font-medium text-gray-800">{order.nama_penerima || '-'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">No. WhatsApp</p>
                                <p className="font-medium text-gray-800">{order.no_wa || '-'}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-gray-400 text-xs mb-1">Alamat</p>
                                <p className="font-medium text-gray-800">{order.alamat || '-'}</p>
                            </div>
                            {(order.status === 'dikirim' || order.status === 'selesai') && (
                                <>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Nomor Resi</p>
                                        <p className="font-medium text-gray-800">{order.resi || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Dikirim Pada</p>
                                        <p className="font-medium text-gray-800">{formatDate(order.dikirim_pada)}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Bukti transfer (sudah ada) */}
                    {order.bukti_transfer && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-amber-600" />
                                <h2 className="font-semibold text-gray-800">Bukti Transfer</h2>
                            </div>
                            <div className="px-6 py-5">
                                <img
                                    src={`/storage/${order.bukti_transfer}`}
                                    alt="Bukti Transfer"
                                    className="max-w-xs rounded-xl border border-orange-100 shadow-sm"
                                />
                                {order.dibayar_pada && (
                                    <p className="text-xs text-gray-400 mt-2">Diunggah pada {formatDate(order.dibayar_pada)}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Upload bukti (belum ada & status menunggu_pembayaran) */}
                    {order.status === 'menunggu_pembayaran' && !order.bukti_transfer && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-sm border border-yellow-200 overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-yellow-200 bg-yellow-50 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-yellow-600" />
                                <h2 className="font-semibold text-gray-800">Upload Bukti Transfer</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                                    <p className="font-semibold mb-1">Informasi Pembayaran</p>
                                    <p>BCA <span className="font-bold">123131</span> a.n G1R1 DK</p>
                                    <p className="mt-1">Total yang harus dibayar: <span className="font-bold">{formatPrice(order.total)}</span></p>
                                </div>

                                <form onSubmit={handleUpload} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pilih Foto Bukti Transfer
                                        </label>
                                        <div
                                            onClick={() => fileRef.current?.click()}
                                            className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-amber-50/50 hover:bg-amber-50"
                                        >
                                            {preview ? (
                                                <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                                                    <p className="text-sm text-gray-500">Klik untuk pilih gambar</p>
                                                    <p className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG — maks. 2MB</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!file || uploading}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        {uploading ? 'Mengunggah...' : 'Upload Bukti Transfer'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* WhatsApp */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <a
                            href={`https://wa.me/085608767693?text=${waMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-2xl transition-all shadow-md hover:shadow-lg"
                        >
                            <Phone className="w-5 h-5" />
                            Hubungi Admin via WhatsApp
                        </a>
                    </motion.div>

                </div>
            </div>
        </>
    );
}
