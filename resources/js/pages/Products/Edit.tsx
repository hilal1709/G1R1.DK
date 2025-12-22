import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    X,
    Trash2,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface ProductImage {
    id: number;
    gambar: string;
}

interface Category {
    id: number;
    nama: string;
}

interface Product {
    id: number;
    nama: string;
    sku: string;
    deskripsi: string | null;
    harga: number;
    stok: number;
    shopee_link: string | null;
    category_id: number;
    images: ProductImage[];
}

interface PageProps {
    product: Product;
    categories: Category[];
}

export default function ProductEdit({ product, categories }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama: product.nama,
        sku: product.sku,
        category_id: product.category_id.toString(),
        deskripsi: product.deskripsi || '',
        harga: product.harga.toString(),
        stok: product.stok.toString(),
        shopee_link: product.shopee_link || '',
        images: [] as File[],
        delete_images: [] as number[],
        _method: 'PUT',
    });

    const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images || []);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newImages = [...data.images, ...files];
            setData('images', newImages);

            // Create previews
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeNewImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = newImagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setNewImagePreviews(newPreviews);
    };

    const markImageForDeletion = (imageId: number) => {
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
        setData('delete_images', [...data.delete_images, imageId]);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
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
                            Update informasi produk {product.nama}
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
                            {/* Existing Images */}
                            {existingImages.length > 0 && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                                        Gambar Yang Ada
                                    </label>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {existingImages.map((image) => (
                                            <div key={image.id} className="relative group">
                                                <img
                                                    src={image.gambar}
                                                    alt="Existing"
                                                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => markImageForDeletion(image.id)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add New Images */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">
                                    Tambah Gambar Baru
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
                                    {newImagePreviews.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-3 gap-4">
                                                {newImagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-lg shadow-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeNewImage(index)}
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
                                                    onChange={handleNewImageChange}
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
                                                        Upload gambar baru
                                                    </span>
                                                    <span className="text-gray-500"> atau drag and drop</span>
                                                    <input
                                                        id="images"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleNewImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    PNG, JPG hingga 2MB per file
                                                </p>
                                            </div>
                                        </div>
                                    )}
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
