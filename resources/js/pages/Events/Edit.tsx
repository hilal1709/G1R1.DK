import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import PublicNavbar from '@/components/PublicNavbar';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    MapPin,
    Users,
    Clock,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';

interface Event {
    id: number;
    nama: string;
    deskripsi: string;
    lokasi: string;
    tanggal_mulai: string;
    tanggal_selesai: string | null;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    max_pendaftar: number | null;
    event_medias?: {
        id: number;
        file_path: string;
    }[];
}

interface PageProps {
    event: Event;
}

export default function EventEdit({ event }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        nama: event.nama,
        deskripsi: event.deskripsi,
        lokasi: event.lokasi,
        tanggal_mulai: event.tanggal_mulai
        ? event.tanggal_mulai.slice(0, 16)
        : '',

    tanggal_selesai: event.tanggal_selesai
        ? event.tanggal_selesai.slice(0, 16)
        : '',
        max_pendaftar: event.max_pendaftar?.toString() || '',
        status: event.status,
        files: [] as File[],
        delete_media: [] as number[],
        _method: 'PUT',

    });

    // MEDIA LAMA (DARI DATABASE, ADA ID)
const [existingMedia, setExistingMedia] = useState(
    event.event_medias ?? []
);

// FILE BARU (UNTUK UPLOAD)
const [newFiles, setNewFiles] = useState<File[]>([]);

// PREVIEW FILE BARU
const [newPreviews, setNewPreviews] = useState<string[]>([]);

// ID MEDIA LAMA YANG DIHAPUS
const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        setData('files', [...data.files, ...files]);

        setNewPreviews(prev => [
            ...prev,
            ...files.map(f => URL.createObjectURL(f))
        ]);

        e.target.value = '';
    };


    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/events/${event.id}`);
    };

    return (
        <>
            <Head title={`Edit Event - ${event.nama}`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/events" />

                {/* Batik Pattern Overlay */}
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <BatikPattern className="w-full h-full text-amber-900 opacity-[0.03]" />
                </div>

                {/* Header */}
                <TraditionalHeader
                    title="Edit Event"
                    subtitle="Update informasi event Damar Kurung"
                    variant="primary"
                >
                    <div className="flex justify-center mt-4">
                        <Link
                            href="/events"
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
                            {/* Image Upload */}
<div>
    <label className="block text-sm font-semibold text-gray-700 mb-4">
        Gambar Event
    </label>

    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-amber-400 transition-colors">
        {/* MEDIA LAMA (DATABASE) */}
        {existingMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {existingMedia.map(media => (
                    <div key={media.id} className="relative">
                        <img
                            src={media.file_path}
                            className="w-full h-32 object-cover rounded-lg shadow"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                // UI
                                setExistingMedia(prev =>
                                    prev.filter(m => m.id !== media.id)
                                );

                                // BACKEND
                                setDeletedMediaIds(prev => {
                                    const updated = [...prev, media.id];
                                    setData('delete_media', updated);
                                    return updated;
                                });
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* PREVIEW FILE BARU */}
        {newPreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {newPreviews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={src}
                            className="w-full h-32 object-cover rounded-lg shadow"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                setNewPreviews(prev =>
                                    prev.filter((_, i) => i !== index)
                                );

                                setData(
                                    'files',
                                    data.files.filter((_, i) => i !== index)
                                );
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                        >
                            Hapus
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* UPLOAD */}
        <div className="text-center space-y-4">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto" />
            <label htmlFor="files" className="cursor-pointer">
                <span className="text-amber-600 font-semibold hover:underline">
                    Upload gambar
                </span>
                <span className="text-gray-500"> atau drag and drop</span>
            </label>
        </div>

        <input
            id="files"
            name="files[]"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
        />
    </div>


    {errors.files && (
        <p className="text-red-500 text-sm mt-2">{errors.files}</p>
    )}
</div>

                            {/* Basic Info */}
                            <div>
                                <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Event <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                    placeholder="Masukkan nama event"
                                    required
                                />
                                {errors.nama && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                                )}
                            </div>

                            {/* lokasi */}
                            <div>
                                <label htmlFor="lokasi" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Lokasi <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="lokasi"
                                        value={data.lokasi}
                                        onChange={(e) => setData('lokasi', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Alamat lengkap lokasi event"
                                        required
                                    />
                                </div>
                                {errors.lokasi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lokasi}</p>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tanggal & Jam Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.tanggal_mulai}
                                        onChange={(e) => setData('tanggal_mulai', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        required
                                    />
                                    {errors.tanggal_mulai && (
                                        <p className="text-red-500 text-sm mt-1">{errors.tanggal_mulai}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tanggal & Jam Selesai
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.tanggal_selesai}
                                        onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                    />
                                    {errors.tanggal_selesai && (
                                        <p className="text-red-500 text-sm mt-1">{errors.tanggal_selesai}</p>
                                    )}
                                </div>
                            </div>



                            {/* Max Participants */}
                            <div>
                                <label htmlFor="max_pendaftar" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Maksimal Peserta
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="number"
                                        id="max_pendaftar"
                                        value={data.max_pendaftar}
                                        onChange={(e) => setData('max_pendaftar', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="0 (tidak terbatas)"
                                        min="0"
                                    />
                                </div>
                                {errors.max_pendaftar && (
                                    <p className="text-red-500 text-sm mt-1">{errors.max_pendaftar}</p>
                                )}
                            </div>



                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi Lengkap <span className="text-red-500">*</span>
                                    <span className="text-sm text-gray-500 font-normal ml-2">
                                        (Maksimal 2000 karakter)
                                    </span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={12}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                    placeholder="Deskripsikan event secara detail (maksimal 2000 karakter)..."
                                    required
                                    maxLength={2000}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {data.deskripsi.length}/2000 karakter
                                </p>
                                {errors.deskripsi && (
                                    <p className="text-red-500 text-sm mt-1">{errors.deskripsi}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Status Event <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                    required
                                >
                                    <option value="upcoming">Mendatang</option>
                                    <option value="ongoing">Berlangsung</option>
                                    <option value="completed">Selesai</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>



                            {/* Actions */}
                            <div className="flex gap-4 pt-6 border-t">
                                <Link
                                    href="/events"
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
                                    {processing ? 'Menyimpan...' : 'Update Event'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
