import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    MapPin,
    Users,
    Clock,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';


export default function EventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        deskripsi: '',
        lokasi: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
        max_pendaftar: '',
        files: [] as File[],

    });

    const [imagePreview, setImagePreview] = useState<string[]>([]);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);

        // append files lama + baru
        setData('files', [...data.files, ...newFiles]);

        // append preview
        const newPreviews = newFiles.map(file =>
            URL.createObjectURL(file)
        );
        setImagePreview(prev => [...prev, ...newPreviews]);

        // RESET input agar bisa pilih file lagi
        e.target.value = '';
    };


    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/events', {
            forceFormData: true,
        });
    };

    const removeImage = (index: number) => {
        setImagePreview(prev => prev.filter((_, i) => i !== index));
        setData('files', data.files.filter((_, i) => i !== index));
    };

    return (
        <>
            <Head title="Tambah Event Baru" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/events" />

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-bold mb-2"
                                >
                                    Tambah Event Baru
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-amber-100 text-lg"
                                >
                                    Buat event Damar Kurung untuk komunitas
                                </motion.p>
                            </div>
                            <Link
                                href="/events"
                                className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Image Upload */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <ImageIcon className="h-5 w-5 text-amber-600" />
                                        Gambar Event *
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors">
    {imagePreview.length > 0 ? (
        <>
            {/* Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreview.map((src, index) => (
                    <div key={index} className="relative">
                        <img
                            src={src}
                            className="h-32 w-full object-cover rounded-lg shadow"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {/* TAMBAH GAMBAR LAGI */}
            <label
                htmlFor="image"
                className="inline-block mt-4 cursor-pointer text-amber-600 font-semibold hover:underline"
            >
                + Tambah gambar lagi
            </label>

            {/* HAPUS SEMUA */}
            <button
                type="button"
                onClick={() => {
                    setImagePreview([]);
                    setData('files', []);
                }}
                className="block mt-2 text-red-500 text-sm"
            >
                Hapus semua gambar
            </button>
        </>
    ) : (
        <>
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <label htmlFor="image" className="cursor-pointer">
                <span className="text-amber-600 font-semibold">
                    Upload gambar
                </span>
                <span className="text-gray-500"> atau drag & drop</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
                PNG, JPG maksimal 10MB
            </p>
        </>
    )}

    {/* INPUT FILE (SELALU ADA) */}
    <input
        id="image"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
    />
</div>
                                    {errors.files && (
                                        <p className="text-red-500 text-sm mt-2">{errors.files}</p>
                                    )}
                                </motion.div>

                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Clock className="h-5 w-5 text-amber-600" />
                                        Nama Event *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Masukkan nama event..."
                                        required
                                    />
                                    {errors.nama && (
                                        <p className="text-red-500 text-sm mt-2">{errors.nama}</p>
                                    )}
                                </motion.div>

                                {/* Location */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <MapPin className="h-5 w-5 text-amber-600" />
                                        Lokasi Event *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.lokasi}
                                        onChange={(e) => setData('lokasi', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Alamat lengkap lokasi event..."
                                        required
                                    />
                                    {errors.lokasi && (
                                        <p className="text-red-500 text-sm mt-2">{errors.lokasi}</p>
                                    )}
                                </motion.div>

                                {/* Date and Time */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Clock className="h-5 w-5 text-amber-600" />
                                        Tanggal & Waktu Event *
                                    </label>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-600 mb-1 block">Tanggal Mulai *</label>
                                            <input
                                                type="datetime-local"
                                                value={data.tanggal_mulai}
                                                onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 "
                                                required
                                            />
                                            {errors.tanggal_mulai && (
                                                <p className="text-red-500 text-xs mt-1">{errors.tanggal_mulai}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-xs text-gray-600 mb-1 block">Tanggal Selesai</label>
                                            <input
                                                type="datetime-local"
                                                value={data.tanggal_selesai}
                                                onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                            />
                                            {errors.tanggal_selesai && (
                                                <p className="text-red-500 text-xs mt-1">{errors.tanggal_selesai}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Max Participants */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Users className="h-5 w-5 text-amber-600" />
                                        Maksimal Peserta
                                    </label>
                                    <input
                                        type="number"
                                        value={data.max_pendaftar}
                                        onChange={(e) => setData('max_pendaftar', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="0 = tidak terbatas"
                                        min="0"
                                    />
                                    {errors.max_pendaftar && (
                                        <p className="text-red-500 text-sm mt-2">{errors.max_pendaftar}</p>
                                    )}
                                </motion.div>

                                {/* Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Deskripsi Lengkap *
                                        <span className="text-sm text-gray-500 font-normal ml-2">
                                            (Maksimal 2000 karakter)
                                        </span>
                                    </label>
                                    <textarea
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        rows={12}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                        placeholder="Deskripsikan event secara detail (maksimal 2000 karakter)..."
                                        required
                                        maxLength={2000}
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        {data.deskripsi.length}/2000 karakter
                                    </p>
                                    {errors.deskripsi && (
                                        <p className="text-red-500 text-sm mt-2">{errors.deskripsi}</p>
                                    )}
                                </motion.div>

                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Actions */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6 sticky top-8"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Aksi</h3>
                                    <div className="space-y-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                        >
                                            <Save className="w-5 h-5" />
                                            {processing ? 'Menyimpan...' : 'Simpan Event'}
                                        </button>
                                        <Link
                                            href="/events"
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            Batal
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
