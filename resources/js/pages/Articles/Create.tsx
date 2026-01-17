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
    AlertCircle,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import PublicNavbar from '@/components/PublicNavbar';

export default function ArticleCreate() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        isi: '',
        files: [] as File[],

    });

    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [wordCount, setWordCount] = useState(0);
    const maxWords = 100;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles = Array.from(selectedFiles);

        setData('files', [...data.files, ...newFiles]);

        const previews = newFiles.map(file =>
            URL.createObjectURL(file)
        );
        setImagePreview(prev => [...prev, ...previews]);

        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setImagePreview(prev => prev.filter((_, i) => i !== index));
        setData('files', data.files.filter((_, i) => i !== index));
    };

    const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const count = words.length;

        if (count <= maxWords) {
            setData('isi', text);
            setWordCount(count);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/articles', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Artikel Baru" />

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
                                    Tambah Artikel Baru
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-amber-100 text-lg"
                                >
                                    Buat artikel tentang Damar Kurung Gresik
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
                                        value={data.judul}
                                        onChange={(e) =>
                                            setData('judul', e.target.value)
                                        }
                                        placeholder="Masukkan judul artikel..."
                                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-900"
                                        required
                                    />
                                    {errors.judul && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.judul}
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
                                        value={data.isi}
                                        onChange={(e) =>
                                            setData('isi', e.target.value)
                                        }
                                        placeholder="Tulis konten artikel Anda di sini..."
                                        rows={15}
                                        className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none text-gray-900"
                                        required
                                    />
                                    {errors.isi && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.isi}
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
                                        Gambar Artikel *
                                    </label>

                                    <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 bg-amber-50">
                                        {imagePreview.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                            {imagePreview.map((src, index) => (
                                                <div key={index} className="relative">
                                                <img
                                                    src={src}
                                                    className="w-full h-32 object-cover rounded-lg border"
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

                                            <label
                                            htmlFor="image"
                                            className="cursor-pointer text-amber-600 font-semibold"
                                            >
                                            + Tambah gambar
                                            </label>
                                        </>
                                        ) : (
                                        <label htmlFor="image" className="block text-center cursor-pointer">
                                            <ImageIcon className="h-12 w-12 text-amber-400 mx-auto mb-2" />
                                            <p className="text-sm font-semibold text-gray-700">
                                            Upload gambar
                                            </p>
                                            <p className="text-xs text-gray-500">
                                            JPG / PNG maksimal 2MB
                                            </p>
                                        </label>
                                        )}

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
                                        <p className="mt-2 text-sm text-red-600">
                                        {errors.files}
                                        </p>
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
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold"
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
