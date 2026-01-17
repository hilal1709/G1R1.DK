import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    DollarSign,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Product {
    id: number;
    nama: string;
    sku: string;
    deskripsi: string;
    harga: number;
    stok: number;
    shopeelink: string;
    images: ProductImage[];
    category_id: number | null;

}
interface ProductImage {
    id: number;
    gambar: string;
}

interface Category {
    id: number;
    nama: string;
}

interface PageProps {
    product: Product;
    categories: Category[]; // tambahkan ini supaya dropdown kategori bisa diisi
}


export default function ProductEdit({ product,categories  }: PageProps) {

    const { data, setData, post, processing, errors } = useForm({
    nama: product.nama,
    sku: product.sku,
    category_id: product.category_id || '',
    deskripsi: product.deskripsi,
    harga: product.harga.toString(),
    stok: product.stok?.toString() || '',
    shopeelink: product.shopeelink || '',
    images: [] as File[],
    delete_images: [] as number[],
    _method: 'PUT',
});

    const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images ?? []);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        setData('images', [...data.images, ...files]);
        setNewPreviews(prev => [
            ...prev,
            ...files.map(f => URL.createObjectURL(f))
        ]);

        e.target.value = '';
    };


    const handleSubmit: FormEventHandler = e => {
        e.preventDefault();
        post(`/products/${product.id}`);
    };


    return (
        <>
            <Head title={`Edit Produk - ${product.nama}`} />

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
                            Edit Produk
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/90"
                        >
                            Update informasi produk Damar Kurung
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
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                Gambar Produk
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-amber-400 transition-colors">
                                
                                {/* GAMBAR LAMA */}
                                    {existingImages.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mb-4">
                                        {existingImages.map((img) => (
                                        <div key={img.id} className="relative">
                                            <img
                                            src={img.gambar}
                                            className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                            type="button"
                                            onClick={() => {
                                                setExistingImages(prev => prev.filter(i => i.id !== img.id));
                                                setData('delete_images', [...data.delete_images, img.id]);
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                            >
                                            Hapus
                                            </button>
                                        </div>
                                        ))}
                                    </div>
                                    )}

                                {/* PREVIEW GAMBAR BARU */}
                                {newPreviews.length > 0 && (
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {newPreviews.map((src, i) => (
                                    <div key={i} className="relative">
                                        <img src={src} className="w-full h-24 object-cover rounded-lg" />
                                        <button
                                        type="button"
                                        onClick={() => {
                                            URL.revokeObjectURL(src);
                                            setNewPreviews(prev => prev.filter((_, idx) => idx !== i));
                                            setData('images', data.images.filter((_, idx) => idx !== i));
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                        >
                                        Hapus
                                        </button>
                                    </div>
                                    ))}
                                </div>
                                )}

                                {/* UPLOAD */}
                                <div className="text-center space-y-3">
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                                <label htmlFor="image" className="cursor-pointer">
                                    <span className="text-amber-600 font-semibold hover:underline">
                                    Upload gambar
                                    </span>
                                    <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    />
                                </label>
                                </div>
                            </div>

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
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Masukkan nama produk"
                                        required
                                    />
                                    {errors.nama && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                                    )}
                                </div>

                                 {/* SKU */}
                                <div>
                                    <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">
                                        SKU <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="sku"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl
                                                focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Masukkan SKU"
                                        required
                                    />
                                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                                </div>
                            </div>

                            <div>
                                    <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kategori <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category_id"
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        value={data.category_id || ''}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories?.length ? (
                                            categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.nama}</option>
                                            ))
                                        ) : (
                                            <option disabled>Belum ada kategori</option>
                                        )}
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
                                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            id="harga"
                                            value={data.harga}
                                            onChange={(e) => setData('harga', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                                    <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stok
                                    </label>
                                    <input
                                        type="number"
                                        id="stok"
                                        value={data.stok}
                                        onChange={(e) => setData('stok', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.stok && (
                                        <p className="text-red-500 text-sm mt-1">{errors.stok}</p>
                                    )}
                                </div>
                            </div>


                            {/* deskripsi */}
                            <div>
                                <label htmlFor="deskripsi" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Lengkap <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Deskripsikan produk secara detail..."
                                    required
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
                                    disabled={processing}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    {processing ? 'Menyimpan...' : 'Update Produk'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
