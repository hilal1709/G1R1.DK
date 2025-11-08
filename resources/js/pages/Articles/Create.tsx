import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    FileText,
    User,
    Tag,
    Calendar,
    Eye,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function ArticleCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image: null as File | null,
        author: '',
        category: '',
        excerpt: '',
        is_published: false,
        published_at: '',
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
        post('/articles');
    };

    return (
        <>
            <Head title="Tambah Artikel Baru" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Tambah Artikel Baru
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Buat artikel tentang Damar Kurung Gresik
                                </p>
                            </div>
                            <Link
                                href="/articles"
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        Judul Artikel *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Masukkan judul artikel..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        Konten Artikel *
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        placeholder="Tulis konten artikel Anda di sini..."
                                        rows={15}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    />
                                    {errors.content && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.content}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Excerpt */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <Eye className="h-5 w-5 text-blue-600" />
                                        Ringkasan (Excerpt)
                                    </label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={(e) =>
                                            setData('excerpt', e.target.value)
                                        }
                                        placeholder="Ringkasan singkat artikel..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    />
                                    {errors.excerpt && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Image Upload */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <ImageIcon className="h-5 w-5 text-blue-600" />
                                        Gambar Artikel
                                    </label>

                                    {imagePreview ? (
                                        <div className="relative mb-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setData('image', null);
                                                }}
                                                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600">
                                                Belum ada gambar
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                                    />
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.image}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Meta Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl shadow-md p-6 space-y-4"
                                >
                                    {/* Author */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <User className="h-4 w-4 text-blue-600" />
                                            Penulis
                                        </label>
                                        <input
                                            type="text"
                                            value={data.author}
                                            onChange={(e) =>
                                                setData('author', e.target.value)
                                            }
                                            placeholder="Nama penulis"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Tag className="h-4 w-4 text-blue-600" />
                                            Kategori
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    'category',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                        >
                                            <option value="">
                                                Pilih kategori
                                            </option>
                                            <option value="Sejarah">
                                                Sejarah
                                            </option>
                                            <option value="Tutorial">
                                                Tutorial
                                            </option>
                                            <option value="Berita">Berita</option>
                                            <option value="Event">Event</option>
                                            <option value="Pengrajin">
                                                Pengrajin
                                            </option>
                                        </select>
                                    </div>

                                    {/* Publish Status */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="h-4 w-4 text-blue-600" />
                                            Status Publikasi
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.is_published}
                                                onChange={(e) =>
                                                    setData(
                                                        'is_published',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Publikasikan artikel
                                            </span>
                                        </label>
                                    </div>

                                    {/* Published Date */}
                                    {data.is_published && (
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                                Tanggal Publikasi
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.published_at}
                                                onChange={(e) =>
                                                    setData(
                                                        'published_at',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                            />
                                        </div>
                                    )}
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="h-5 w-5" />
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Artikel'}
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
