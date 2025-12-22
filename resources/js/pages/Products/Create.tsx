import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    DollarSign,
    X,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    nama: string;
}

interface Props {
    categories: Category[];
}

export default function ProductCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        sku: '',
        category_id: '',
        deskripsi: '',
        harga: '',
        stok: '',
        shopee_link: '',
        images: [] as File[],
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newImages = [...data.images, ...files];
            setData('images', newImages);

            // Create previews
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Validasi minimal 3 gambar
        if (data.images.length < 3) {
            alert('Minimal 3 gambar produk harus diupload!');
            return;
        }

        post(route('products.store'));
    };

    return (
        <>
            <Head title="Tambah Produk Baru" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                {/* Navigation */}
                <nav className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/dashboard" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">DK</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    Damar Kurung
                                </span>
                            </Link>

                            <div className="flex items-center space-x-6">
                                <Link href="/dashboard" className="text-gray-700 hover:text-amber-600">Dashboard</Link>
                                <Link href="/products" className="text-gray-700 hover:text-amber-600">Produk</Link>
                                <Link href="/events" className="text-gray-700 hover:text-amber-600">Event</Link>
                                <Link href="/articles" className="text-gray-700 hover:text-amber-600">Artikel</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Tambah Produk Baru
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/90"
                        >
                            Tambahkan produk Damar Kurung baru ke katalog
                        </motion.p>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Gambar Produk <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-sm text-gray-600">
                                        Upload minimal <span className="font-bold text-amber-600">3 gambar</span> produk
                                    </p>
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                        data.images.length >= 3
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {data.images.length} / 3 gambar
                                    </span>
                                </div>
                                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                    data.images.length >= 3
                                        ? 'border-green-300 bg-green-50 hover:border-green-400'
                                        : 'border-gray-300 hover:border-amber-400'
                                }`}>
                                    {imagePreviews.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-3 gap-4">
                                                {imagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-lg shadow-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(index)}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <label htmlFor="images" className="cursor-pointer inline-block">
                                                <span className="text-amber-600 hover:text-amber-700 font-semibold">
                                                    + Tambah Gambar Lagi
                                                </span>
                                                <input
                                                    id="images"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
                                            <div>
                                                <label htmlFor="images" className="cursor-pointer">
                                                    <span className="text-amber-600 hover:text-amber-700 font-semibold">
                                                        Upload gambar
                                                    </span>
                                                    <span className="text-gray-500"> atau drag and drop</span>
                                                    <input
                                                        id="images"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    PNG, JPG hingga 2MB per file • <span className="font-semibold text-amber-600">Minimal 3 gambar</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {data.images.length > 0 && data.images.length < 3 && (
                                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="text-sm text-amber-800">
                                            Anda perlu menambahkan <span className="font-bold">{3 - data.images.length} gambar lagi</span> untuk memenuhi minimal 3 gambar.
                                        </p>
                                    </div>
                                )}
                                {errors.images && (
                                    <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Masukkan nama produk"
                                        required
                                    />
                                    {errors.nama && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">
                                        SKU <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="sku"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Contoh: DK-001"
                                        required
                                    />
                                    {errors.sku && (
                                        <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.nama}</option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
                                )}
                            </div>

                            {/* Price and Stock */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="harga" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Harga <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                                        <input
                                            type="number"
                                            id="harga"
                                            value={data.harga}
                                            onChange={(e) => setData('harga', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                            required
                                        />
                                    </div>
                                    {errors.harga && (
                                        <p className="text-red-500 text-sm mt-1">{errors.harga}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="stok" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stok <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="stok"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                    {errors.stok && (
                                        <p className="text-red-500 text-sm mt-1">{errors.stok}</p>
                                    )}
                                </div>
                            </div>

                            {/* Shopee Link */}
                            <div>
                                <label htmlFor="shopee_link" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Link Shopee (Opsional)
                                </label>
                                <input
                                    type="url"
                                    id="shopee_link"
                                    value={data.shopee_link}
                                    onChange={(e) => setData('shopee_link', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="https://shopee.co.id/..."
                                />
                                {errors.shopee_link && (
                                    <p className="text-red-500 text-sm mt-1">{errors.shopee_link}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Deskripsikan produk secara detail..."
                                />
                                {errors.deskripsi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-6 border-t">
                                <Link
                                    href="/products"
                                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || data.images.length < 3}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    {processing ? 'Menyimpan...' : data.images.length < 3 ? `Minimal 3 Gambar (${data.images.length}/3)` : 'Simpan Produk'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
