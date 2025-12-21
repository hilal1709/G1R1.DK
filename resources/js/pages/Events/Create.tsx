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
        title: '',
        description: '',
        image: null as File | null,
        location: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        max_participants: '',
        short_description: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        post('/events');
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
                                                            Upload gambar
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
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Masukkan nama event..."
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-2">{errors.title}</p>
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
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Alamat lengkap lokasi event..."
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-2">{errors.location}</p>
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
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                                required
                                            />
                                            {errors.start_date && (
                                                <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-600 mb-1 block">Tanggal Selesai</label>
                                            <input
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                            />
                                            {errors.end_date && (
                                                <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-600 mb-1 block">Waktu Mulai *</label>
                                            <input
                                                type="time"
                                                value={data.start_time}
                                                onChange={(e) => setData('start_time', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                                required
                                            />
                                            {errors.start_time && (
                                                <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-600 mb-1 block">Waktu Selesai</label>
                                            <input
                                                type="time"
                                                value={data.end_time}
                                                onChange={(e) => setData('end_time', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                            />
                                            {errors.end_time && (
                                                <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>
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
                                        value={data.max_participants}
                                        onChange={(e) => setData('max_participants', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="0 = tidak terbatas"
                                        min="0"
                                    />
                                    {errors.max_participants && (
                                        <p className="text-red-500 text-sm mt-2">{errors.max_participants}</p>
                                    )}
                                </motion.div>

                                {/* Short Description */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Deskripsi Singkat *
                                    </label>
                                    <textarea
                                        value={data.short_description}
                                        onChange={(e) => setData('short_description', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                        placeholder="Ringkasan singkat tentang event..."
                                        required
                                        maxLength={200}
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        {data.short_description.length}/200 karakter
                                    </p>
                                    {errors.short_description && (
                                        <p className="text-red-500 text-sm mt-2">{errors.short_description}</p>
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
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={12}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                        placeholder="Deskripsikan event secara detail (maksimal 2000 karakter)..."
                                        required
                                        maxLength={2000}
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        {data.description.length}/2000 karakter
                                    </p>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-2">{errors.description}</p>
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
