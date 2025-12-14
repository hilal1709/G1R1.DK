import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    FileText,
    User,
    Tag,
    Eye,
    AlertCircle,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';

interface Article {
    id: number;
    title: string;
    content: string;
    image: string | null;
    author: string | null;
    category: string | null;
    excerpt: string | null;
    is_published: boolean;
    published_at: string | null;
}

interface PageProps {
    article: Article;
}

export default function ArticleEdit({ article }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: article.title,
        content: article.content,
        image: null as File | null,
        author: article.author || '',
        category: article.category || '',
        excerpt: article.excerpt || '',
        is_published: article.is_published,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        article.image ? `/storage/${article.image}` : null,
    );
    const [wordCount, setWordCount] = useState(() => {
        const words = (article.excerpt || '').trim().split(/\s+/).filter(word => word.length > 0);
        return words.length;
    });
    const maxWords = 100;

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

    const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const count = words.length;

        if (count <= maxWords) {
            setData('excerpt', text);
            setWordCount(count);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/articles/${article.id}`);
    };

    return (
        <>
            <Head title={`Edit: ${article.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/articles" />

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
                                    Edit Artikel
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-amber-100 text-lg"
                                >
                                    Perbarui artikel: {article.title}
                                </motion.p>
                            </div>
                            <Link
                                href="/articles"
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
                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <FileText className="h-5 w-5 text-amber-600" />
                                        Judul Artikel *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Masukkan judul artikel..."
                                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-900"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.title}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <FileText className="h-5 w-5 text-amber-600" />
                                        Konten Artikel *
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) =>
                                            setData('content', e.target.value)
                                        }
                                        placeholder="Tulis konten artikel Anda di sini..."
                                        rows={15}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none text-gray-900"
                                        required
                                    />
                                    {errors.content && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.content}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Excerpt - Word Counter */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Eye className="h-5 w-5 text-amber-600" />
                                            Deskripsi Singkat *
                                        </label>
                                        <span className={`text-sm font-semibold ${wordCount >= maxWords ? 'text-red-600' : wordCount >= maxWords * 0.8 ? 'text-orange-600' : 'text-gray-600'}`}>
                                            {wordCount}/{maxWords} kata
                                        </span>
                                    </div>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={handleExcerptChange}
                                        placeholder="Tulis deskripsi singkat maksimal 100 kata..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none text-gray-900"
                                        required
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Deskripsi singkat akan ditampilkan di halaman preview artikel
                                    </p>
                                    {errors.excerpt && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
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
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                                        <ImageIcon className="h-5 w-5 text-amber-600" />
                                        Gambar Artikel
                                    </label>

                                    {imagePreview ? (
                                        <div className="relative mb-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg border-2 border-amber-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setData('image', null);
                                                }}
                                                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center mb-4 bg-amber-50">
                                            <ImageIcon className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Belum ada gambar
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Upload gambar baru untuk artikel
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer"
                                    />
                                    <p className="mt-2 text-xs text-gray-500">
                                        Format: JPG, PNG, atau GIF. Maksimal 2MB. Biarkan kosong jika tidak ingin mengubah gambar.
                                    </p>
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.image}
                                        </p>
                                    )}
                                </motion.div>

                                {/* Meta Information */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6 space-y-4"
                                >
                                    {/* Author */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <User className="h-4 w-4 text-amber-600" />
                                            Penulis
                                        </label>
                                        <input
                                            type="text"
                                            value={data.author}
                                            onChange={(e) =>
                                                setData('author', e.target.value)
                                            }
                                            placeholder="Nama penulis"
                                            className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm text-gray-900"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Tag className="h-4 w-4 text-amber-600" />
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
                                            className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm text-gray-900"
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

                                    {/* Status */}
                                    <div>
                                        <label className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={data.is_published}
                                                onChange={(e) =>
                                                    setData(
                                                        'is_published',
                                                        e.target.checked,
                                                    )
                                                }
                                                className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                                            />
                                            <span className="text-sm text-gray-700">
                                                Publikasikan artikel sekarang
                                            </span>
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500 ml-8">
                                            Tanggal publikasi akan diatur otomatis saat ini
                                        </p>
                                    </div>
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
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                    >
                                        <Save className="h-5 w-5" />
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Update Artikel'}
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
