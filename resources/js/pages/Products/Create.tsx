import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    DollarSign,
} from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import PublicNavbar from '@/components/PublicNavbar';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';

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
    shopeelink: '',
    images: [] as File[],
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    useEffect(() => {
        return () => {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    // Multi-image preview dengan Promise.all supaya urutannya aman
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);

        // Validasi ukuran (maks 10MB)
        const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
        if (validFiles.length < newFiles.length) {
            alert("Beberapa file diabaikan karena ukurannya lebih dari 10MB");
        }

        // Tambahkan file baru tanpa hapus file lama
        setData('images', [...data.images, ...newFiles]);

        // Buat preview baru dan gabungkan dengan yang lama
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);

        e.target.value = ''; // supaya bisa pilih file sama lagi
    };

    const removeImage = (index: number) => {
        // Hapus dari data dan preview
        setData('images', data.images.filter((_, i) => i !== index));
        const removedPreview = imagePreviews[index];
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(removedPreview); // bersihkan memory
    };

    const removeAllImages = () => {
        imagePreviews.forEach(url => URL.revokeObjectURL(url));
        setImagePreviews([]);
        setData('images', []);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <>
            <Head title="Tambah Produk Baru" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/products" />

                {/* Batik Pattern Overlay */}
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <BatikPattern className="w-full h-full text-amber-900 opacity-[0.03]" />
                </div>

                {/* Header */}
                <TraditionalHeader
                    title="Tambah Produk Baru"
                    subtitle="Tambahkan produk Damar Kurung ke katalog"
                    variant="primary"
                >
                    <div className="flex justify-center mt-4">
                        <Link
                            href="/products"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold border-2 border-white/20"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Kembali
                        </Link>
                    </div>
                </TraditionalHeader>

                {/* Form */}
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Images */}
                            <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                                Gambar Produk <span className="text-red-500">*</span>
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors relative">

                                {/* INPUT FILE SELALU ADA */}
                                <input
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                                />

                                {imagePreviews.length > 0 ? (
                                <>
                                    {/* PREVIEW */}
                                    <div className="grid grid-cols-4 gap-4">
                                    {imagePreviews.map((src, i) => (
                                        <div key={i} className="relative">
                                        <img
                                            src={src}
                                            alt={`Preview ${i}`}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                                            aria-label={`Hapus gambar ${i + 1}`}
                                        >
                                            ✕
                                        </button>
                                        </div>
                                    ))}
                                    </div>

                                    {/* HAPUS SEMUA */}
                                    <button
                                    type="button"
                                    onClick={removeAllImages}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-semibold"
                                    >
                                    Hapus Semua
                                    </button>

                                    {/* TAMBAH GAMBAR */}
                                    <label
                                    htmlFor="images"
                                    className="block mt-6 cursor-pointer text-amber-600 font-semibold hover:text-amber-700"
                                    >
                                    + Tambah gambar
                                    </label>
                                </>
                                ) : (
                                <div className="space-y-4">
                                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
                                    <div>
                                    <label htmlFor="images" className="cursor-pointer">
                                        <span className="text-amber-600 hover:text-amber-700 font-semibold">
                                        Upload gambar
                                        </span>{' '}
                                        <span className="text-gray-500">atau drag and drop</span>
                                    </label>
                                    <p className="text-sm text-gray-500 mt-1">
                                        PNG, JPG, GIF hingga 10MB
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
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nama Produk <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
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

                                <div>
                                <label htmlFor="sku" className="block text-sm font-semibold text-gray-700 mb-2">SKU <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="sku"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Masukkan SKU"
                                    required
                                />
                                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">Kategori <span className="text-red-500">*</span></label>
                                <select
                                id="category_id"
                                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                value={data.category_id}
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
                                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                            </div>

                            {/* harga and Stock */}
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
                                        id="stock"
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



                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Lengkap <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
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

                            {/* Shopee Link */}
                            <div>
                                <label htmlFor="shopeelink" className="block text-sm font-semibold text-gray-700 mb-2">Link Shopee</label>
                                <input
                                type="text"
                                id="shopeelink"
                                value={data.shopeelink}
                                onChange={(e) => setData('shopeelink', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="https://shopee.co.id/..."
                                />
                                {errors.shopeelink && <p className="text-red-500 text-sm mt-1">{errors.shopeelink}</p>}
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
                                    {processing ? 'Menyimpan...' : 'Simpan Produk'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
