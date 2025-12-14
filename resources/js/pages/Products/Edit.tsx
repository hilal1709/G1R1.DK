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
    name: string;
    description: string;
    price: number;
    image: string | null;
    category: string | null;
    stock: number | null;
    is_active: boolean;
    excerpt: string | null;
}

interface PageProps {
    product: Product;
}

export default function ProductEdit({ product }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: null as File | null,
        category: product.category || '',
        stock: product.stock?.toString() || '',
        is_active: product.is_active,
        short_description: product.excerpt || '',
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        product.image ? `/storage/${product.image}` : null,
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/products/${product.id}`);
    };

    return (
        <>
            <Head title={`Edit Produk - ${product.name}`} />

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
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
                                    {imagePreview ? (
                                        <div className="space-y-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-w-xs mx-auto rounded-lg shadow-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setData('image', null);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Hapus Gambar
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
                                            <div>
                                                <label htmlFor="image" className="cursor-pointer">
                                                    <span className="text-amber-600 hover:text-amber-700 font-semibold">
                                                        Upload gambar baru
                                                    </span>
                                                    <span className="text-gray-500"> atau drag and drop</span>
                                                    <input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    PNG, JPG, GIF hingga 10MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image && (
                                    <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Masukkan nama produk"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kategori
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Contoh: Lampu, Hiasan, dll"
                                    />
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>
                            </div>

                            {/* Price and Stock */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Harga <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            id="price"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="0"
                                            min="0"
                                            step="1000"
                                            required
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stok
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.stock && (
                                        <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                                    )}
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="short_description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ringkasan Produk
                                </label>
                                <textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Deskripsi singkat produk (max 200 karakter)"
                                    maxLength={200}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {data.short_description.length}/200 karakter
                                </p>
                                {errors.short_description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Lengkap <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Deskripsikan produk secara detail..."
                                    required
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                                    Produk aktif dan dapat dipesan
                                </label>
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
