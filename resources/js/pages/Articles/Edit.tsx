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
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';

interface Article {
    id: number;
    judul: string;
    isi: string;
    article_medias?: {
        id: number;
        file_path: string;
    }[];
    user: { name: string } | null;
}

interface PageProps {
    article: Article;
}

export default function ArticleEdit({ article }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        judul: article.judul,
        isi: article.isi,
        files: [] as File[],
        delete_media: [] as number[],

        _method: 'PUT',
    });

    // MEDIA LAMA
    const [existingMedia, setExistingMedia] = useState(article.article_medias ?? []);

    // FILE BARU
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    // MEDIA YANG DIHAPUS
    const [deletedMediaIds, setDeletedMediaIds] = useState<number[]>([]);

    console.log(existingMedia);


    const [wordCount, setWordCount] = useState(() => {
        const words = (article.isi || '').trim().split(/\s+/).filter(word => word.length > 0);
        return words.length;
    });
    const maxWords = 100;

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
        post(`/articles/${article.id}`);
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



    return (
        <>
            <Head title={`Edit: ${article.judul}`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/articles" />

                {/* Batik Pattern Overlay */}
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <BatikPattern className="w-full h-full text-amber-900 opacity-[0.03]" />
                </div>

                {/* Header */}
                <TraditionalHeader
                    title="Edit Artikel"
                    subtitle="Perbarui informasi artikel Damar Kurung"
                    variant="primary"
                >
                    <div className="flex justify-center mt-4">
                        <Link
                            href="/articles"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold border-2 border-white/20"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Kembali
                        </Link>
                    </div>
                </TraditionalHeader>

                {/* Form */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                                        Gambar Artikel
                                    </label>

                                    {/* EXISTING MEDIA */}
                                    {existingMedia.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                            {existingMedia.map((media) => (
                                                <div key={media.id} className="relative group">
                                                    <img
                                                        src={media.file_path}
                                                        className="w-full h-32 object-cover rounded-lg border-2 border-amber-100"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            // Hapus dari UI
                                                            setExistingMedia(prev =>
                                                                prev.filter(m => m.id !== media.id)
                                                            );
                                                            // Tandai untuk backend
                                                            setDeletedMediaIds(prev => {
                                                                const updated = [...prev, media.id];
                                                                setData('delete_media', updated);
                                                                return updated;
                                                            });
                                                        }}
                                                        className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* NEW FILES */}
                                    {newPreviews.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                            {newPreviews.map((src, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={src}
                                                        className="w-full h-32 object-cover rounded-lg border-2 border-amber-100"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setNewPreviews(prev =>
                                                                prev.filter((_, i) => i !== index)
                                                            );
                                                            setData('files', data.files.filter((_, i) => i !== index));
                                                        }}
                                                        className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* NO IMAGE PLACEHOLDER */}
                                    {existingMedia.length === 0 && newPreviews.length === 0 && (
                                        <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center mb-4 bg-amber-50">
                                            <ImageIcon className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-600 mb-1 font-semibold">
                                                Belum ada gambar
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Upload satu atau beberapa gambar
                                            </p>
                                        </div>
                                    )}

                                    {/* UPLOAD INPUT */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer"
                                    />

                                    <p className="mt-2 text-xs text-gray-500">
                                        Format: JPG, PNG, atau GIF. Maksimal 2MB per file.
                                    </p>

                                    {errors.files && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
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
