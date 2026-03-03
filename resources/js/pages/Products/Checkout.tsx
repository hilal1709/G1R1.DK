import { motion } from 'framer-motion';
import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';
import { ShoppingBag, Package, MapPin, Phone, User, Truck, AlertCircle, CheckCircle } from 'lucide-react';

interface Product {
    id: number;
    nama: string;
    harga: number;
    stok: number;
    images: { gambar: string }[];
    category: { nama: string };
}

interface Props {
    product: Product;
    qty: number;
}

export default function Checkout({ product, qty }: Props) {
    const initialQty = Number(qty) || 1;
    const [quantity, setQuantity] = useState(initialQty);

    const { data, setData, post, processing, errors } = useForm<{
        nama_penerima: string;
        no_wa: string;
        alamat: string;
        ekspedisi: string;
        products: { product_id: number; qty: number }[];
    }>({
        nama_penerima: '',
        no_wa: '',
        alamat: '',
        ekspedisi: '',
        products: [{ product_id: product.id, qty: initialQty }],
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQtyChange = (val: number) => {
        const clamped = Math.max(1, Math.min(product.stok, val));
        setQuantity(clamped);
        setData('products', [{ product_id: product.id, qty: clamped }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };

    const subtotal = product.harga * quantity;

    const productImage =
        product.images && product.images.length > 0 ? product.images[0].gambar : null;

    return (
        <>
            <Head title={`Checkout – ${product.nama} | Damar Kurung`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/products" />

                {/* Background Batik */}
                <div className="relative min-h-screen">
                    <div className="absolute inset-0 text-amber-900 opacity-[0.02] pointer-events-none">
                        <BatikPattern />
                    </div>

                    <div className="relative">
                        {/* Breadcrumb */}
                        <div className="bg-white border-b">
                            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                <div className="flex items-center space-x-2 text-sm">
                                    <Link href="/" className="text-gray-500 hover:text-amber-600 transition-colors">
                                        Beranda
                                    </Link>
                                    <span className="text-gray-400">/</span>
                                    <Link href="/products" className="text-gray-500 hover:text-amber-600 transition-colors">
                                        Produk
                                    </Link>
                                    <span className="text-gray-400">/</span>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-gray-500 hover:text-amber-600 transition-colors truncate max-w-[150px]"
                                    >
                                        {product.nama}
                                    </Link>
                                    <span className="text-gray-400">/</span>
                                    <span className="text-amber-700 font-semibold">Checkout</span>
                                </div>
                            </div>
                        </div>

                        {/* Page Title */}
                        <TraditionalHeader
                            title="Form Checkout"
                            subtitle="Isi data pengiriman untuk menyelesaikan pesanan Anda"
                            variant="primary"
                        />

                        {/* Main Content */}
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            {/* Server-side errors */}
                            {errors && Object.keys(errors).length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        {Object.values(errors).map((msg: any, i) => (
                                            <p key={i} className="text-red-700 text-sm">{msg}</p>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div className="grid lg:grid-cols-5 gap-8">
                                {/* LEFT – Form */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="lg:col-span-3"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Jumlah */}
                                        <div className="bg-white rounded-2xl shadow-lg p-6">
                                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Package className="w-5 h-5 text-amber-600" />
                                                Detail Pesanan
                                            </h2>

                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Jumlah
                                                <span className="ml-2 text-gray-400 font-normal">
                                                    (Stok tersedia: {product.stok})
                                                </span>
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleQtyChange(quantity - 1)}
                                                    className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center justify-center font-bold text-lg transition-colors"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    min={1}
                                                    max={product.stok}
                                                    onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
                                                    className="w-20 text-center border border-gray-300 text-gray-900 rounded-lg py-2 font-semibold focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleQtyChange(quantity + 1)}
                                                    disabled={quantity >= product.stok}
                                                    className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center justify-center font-bold text-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Data Penerima */}
                                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
                                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                <User className="w-5 h-5 text-amber-600" />
                                                Data Penerima
                                            </h2>

                                            {/* Nama Penerima */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Nama Penerima <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.nama_penerima}
                                                    onChange={(e) => setData('nama_penerima', e.target.value)}
                                                    placeholder="Masukkan nama lengkap penerima"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                                />
                                            </div>

                                            {/* No WhatsApp */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    No WhatsApp <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={data.no_wa}
                                                        onChange={(e) => setData('no_wa', e.target.value)}
                                                        placeholder="Contoh: 08123456789"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            {/* Alamat */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Alamat Lengkap <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                                    <textarea
                                                        value={data.alamat}
                                                        onChange={(e) => setData('alamat', e.target.value)}
                                                        rows={3}
                                                        placeholder="Jl. Nama Jalan, No. Rumah, Kelurahan, Kecamatan, Kota, Kode Pos"
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-gray-400 resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ekspedisi */}
                                        <div className="bg-white rounded-2xl shadow-lg p-6">
                                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <Truck className="w-5 h-5 text-amber-600" />
                                                Pengiriman
                                            </h2>

                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Pilih Ekspedisi <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={data.ekspedisi}
                                                onChange={(e) => setData('ekspedisi', e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-white"
                                            >
                                                <option value="">-- Pilih Ekspedisi --</option>
                                                <option value="JNE">JNE</option>
                                                <option value="J&T">J&T Express</option>
                                                <option value="SiCepat">SiCepat</option>
                                                <option value="Pos Indonesia">Pos Indonesia</option>
                                                <option value="Anteraja">Anteraja</option>
                                            </select>

                                            {/* Info ongkir */}
                                            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-amber-800">
                                                    <span className="font-semibold">Catatan:</span>{' '}
                                                    Ongkos kirim dan total pembayaran akan ditentukan setelah admin mengonfirmasi pesanan Anda.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingBag className="w-5 h-5" />
                                                    Konfirmasi Pesanan
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>

                                {/* RIGHT – Order Summary */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="lg:col-span-2"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                                        {/* Product Image */}
                                        {productImage ? (
                                            <img
                                                src={productImage}
                                                alt={product.nama}
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                                <ShoppingBag className="w-16 h-16 text-amber-400" />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                                {product.category?.nama}
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                                                {product.nama}
                                            </h3>

                                            <div className="border-t pt-4 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Harga satuan</span>
                                                    <span className="font-semibold text-gray-900">{formatPrice(product.harga)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Jumlah</span>
                                                    <span className="font-semibold text-gray-900">× {quantity}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Ongkos kirim</span>
                                                    <span className="text-amber-600 font-semibold text-xs bg-amber-50 px-2 py-0.5 rounded-full">
                                                        Dikonfirmasi admin
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t mt-4 pt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-gray-900">Subtotal</span>
                                                    <span className="text-2xl font-bold text-amber-600">
                                                        {formatPrice(subtotal)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="mt-5 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-xs text-green-800">
                                                    Pesanan aman. Admin akan menghubungi Anda melalui WhatsApp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
