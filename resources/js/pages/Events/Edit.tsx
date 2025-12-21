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

interface Event {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    location: string;
    start_date: string;
    end_date: string | null;
    start_time: string;
    end_time: string | null;
    max_participants: number | null;
    short_description: string | null;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    is_featured: boolean;
}

interface PageProps {
    event: Event;
}

export default function EventEdit({ event }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: event.title,
        description: event.description,
        image: null as File | null,
        location: event.location,
        start_date: event.start_date,
        end_date: event.end_date || '',
        start_time: event.start_time,
        end_time: event.end_time || '',
        max_participants: event.max_participants?.toString() || '',
        short_description: event.short_description || '',
        status: event.status,
        is_featured: event.is_featured,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        event.image ? `/storage/${event.image}` : null,
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
        post(`/events/${event.slug}`);
    };

    return (
        <>
            <Head title={`Edit Event - ${event.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/events" />

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Edit Event
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-white/90"
                        >
                            Update informasi event Damar Kurung
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
                                    Gambar Event
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
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nama Event <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                    placeholder="Masukkan nama event"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Lokasi <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="Alamat lengkap lokasi event"
                                        required
                                    />
                                </div>
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tanggal Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        required
                                    />
                                    {errors.start_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Tanggal Selesai
                                    </label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                    />
                                    {errors.end_date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                                    )}
                                </div>
                            </div>

                            {/* Time */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_time" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Waktu Mulai <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="time"
                                            id="start_time"
                                            value={data.start_time}
                                            onChange={(e) => setData('start_time', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                            required
                                        />
                                    </div>
                                    {errors.start_time && (
                                        <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="end_time" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Waktu Selesai
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="time"
                                            id="end_time"
                                            value={data.end_time}
                                            onChange={(e) => setData('end_time', e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        />
                                    </div>
                                    {errors.end_time && (
                                        <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>
                                    )}
                                </div>
                            </div>

                            {/* Max Participants */}
                            <div>
                                <label htmlFor="max_participants" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Maksimal Peserta
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="number"
                                        id="max_participants"
                                        value={data.max_participants}
                                        onChange={(e) => setData('max_participants', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                                        placeholder="0 (tidak terbatas)"
                                        min="0"
                                    />
                                </div>
                                {errors.max_participants && (
                                    <p className="text-red-500 text-sm mt-1">{errors.max_participants}</p>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label htmlFor="short_description" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ringkasan Event
                                </label>
                                <textarea
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                    placeholder="Deskripsi singkat event (max 500 karakter)"
                                    maxLength={500}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {data.short_description.length}/500 karakter
                                </p>
                                {errors.short_description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>
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
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={12}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-gray-900"
                                    placeholder="Deskripsikan event secara detail (maksimal 2000 karakter)..."
                                    required
                                    maxLength={2000}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    {data.description.length}/2000 karakter
                                </p>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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

                            {/* Featured */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                                />
                                <label htmlFor="is_featured" className="ml-3 text-sm font-semibold text-gray-700">
                                    Tandai sebagai Featured Event
                                </label>
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
