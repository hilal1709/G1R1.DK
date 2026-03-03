import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    User,
    Tag,
    Edit,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';
import { router, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';


interface Article {
    id: number;
    judul: string;              // judul artikel
    isi: string | null;         // isi artikel
    article_medias?: { file_path: string }[];
    user: { name: string } | null;
    comments?: Comment[];
    created_at: string;
    updated_at: string;
}

interface PageProps {
    article: Article;
}

interface Comment {
    id: number;
    komentar: string;
    user_id: number;
    user: {
        name: string;
    };
    created_at: string;
}

export default function ArticleShow({ article }: PageProps) {

    const { auth } = usePage().props as any;

    const { data, setData, post, processing, reset } = useForm({
        komentar: '',
        article_id: article.id,
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');


    return (
        <>
            <Head title={article.judul} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/articles" />

                {/* Header */}
                <TraditionalHeader
                    title={article.judul}
                    subtitle={`Ditulis oleh ${article.user?.name || 'Admin'}`}
                    variant="primary"
                >
                    <div className="flex gap-4">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Kembali
                        </Link>
                        {auth?.user?.role === 'admin' && (
                            <Link
                                href={`/articles/${article.id}/edit`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                            >
                                <Edit className="h-5 w-5" />
                                Edit Artikel
                            </Link>
                        )}
                    </div>
                </TraditionalHeader>

                {/* Background with Batik Pattern */}
                <div className="relative min-h-screen">
                    <div className="absolute inset-0 text-amber-900 opacity-[0.03]">
                        <BatikPattern />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100"
                        >
                            {article.article_medias?.length ? (
                                <img
                                    src={`${article.article_medias[0].file_path}`}
                                    alt={article.judul}
                                    className="w-full h-auto object-contain"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-48 text-gray-400 bg-amber-50">
                                    Tidak ada gambar
                                </div>
                            )}
                        </motion.div>

                        {/* Article Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-amber-100 shadow-lg p-8 mb-6"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {article.judul}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-4 pb-6 border-b border-amber-200">
                                {article.user?.name && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="h-5 w-5 text-amber-600" />
                                        <span className="font-medium">
                                            {article.user?.name}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-5 w-5 text-amber-600" />
                                    <span>
                                        {new Date(
                                            article.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Article Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-amber-100 shadow-lg p-8"
                        >
                            <div className="prose prose-lg max-w-none">
                                <div
                                    className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                                    style={{ fontSize: '1.125rem' }}
                                >
                                    {article.isi}
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 p-4 bg-white rounded-xl border border-amber-100 shadow-md"
                        >
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                    Dibuat:{' '}
                                    {new Date(
                                        article.created_at,
                                    ).toLocaleString('id-ID')}
                                </span>
                                <span>
                                    Update terakhir:{' '}
                                    {new Date(
                                        article.updated_at,
                                    ).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </motion.div>
                        {/* Comments Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 bg-white rounded-2xl border border-amber-100 shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Komentar
                            </h2>

                            {/* List komentar */}
                            {article.comments && article.comments.length > 0 ? (
                                <div className="space-y-4">
                                    {article.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border-b border-amber-100 pb-4 flex justify-between gap-4"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold text-amber-700">
                                                    {comment.user.name}
                                                </p>

                                                {/* Mode Edit / View */}
                                                {editingId === comment.id ? (
                                                    <textarea
                                                        className="w-full border text-gray-800 rounded-xl p-2 mt-2 focus:ring focus:ring-amber-300"
                                                        value={editingText}
                                                        onChange={(e) =>
                                                            setEditingText(e.target.value)
                                                        }
                                                    />
                                                ) : (
                                                    <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                                                        {comment.komentar}
                                                    </p>
                                                )}

                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(comment.created_at).toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </p>
                                            </div>

                                            {/* Tombol aksi (hanya pemilik komentar) */}
                                            {auth?.user?.id === comment.user_id && (
                                                <div className="flex items-start gap-2 mt-1">
                                                    {editingId === comment.id ? (
                                                        <>
                                                            {/* Simpan */}
                                                            <button
                                                                onClick={() => {
                                                                    if (!editingText.trim()) return;

                                                                    router.put(
                                                                        `/comments/${comment.id}`,
                                                                        {
                                                                            komentar: editingText,
                                                                        },
                                                                        {
                                                                            onSuccess: () => {
                                                                                setEditingId(null);
                                                                                setEditingText('');
                                                                            },
                                                                        },
                                                                    );
                                                                }}
                                                                className="text-green-600 hover:text-green-700"
                                                                title="Simpan"
                                                            >
                                                                <CheckCircle className="w-5 h-5" />
                                                            </button>

                                                            {/* Batal */}
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(null);
                                                                    setEditingText('');
                                                                }}
                                                                className="text-gray-500 hover:text-gray-700"
                                                                title="Batal"
                                                            >
                                                                <XCircle className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Edit */}
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(comment.id);
                                                                    setEditingText(comment.komentar);
                                                                }}
                                                                className="text-amber-600 hover:text-amber-700"
                                                                title="Edit"
                                                            >
                                                                <Edit className="w-5 h-5" />
                                                            </button>

                                                            {/* Delete */}
                                                            <button
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Hapus komentar ini?',
                                                                        )
                                                                    ) {
                                                                        router.delete(
                                                                            `/comments/${comment.id}`,
                                                                        );
                                                                    }
                                                                }}
                                                                className="text-red-600 hover:text-red-700"
                                                                title="Hapus"
                                                            >
                                                                <XCircle className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    Belum ada komentar.
                                </p>
                            )}

                            {/* Form tambah komentar */}
                            {auth?.user && (
                                <div className="mt-6">
                                    {auth?.user && (
                                        <form
                                            className="mt-6"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                post('/comments', {
                                                    preserveScroll: true,
                                                    onSuccess: () => reset(),
                                                });
                                            }}
                                        >
                                            <textarea
                                                className="w-full border text-gray-800 rounded-xl p-3 focus:ring focus:ring-amber-300"
                                                rows={3}
                                                placeholder="Tulis komentar..."
                                                value={data.komentar}
                                                onChange={(e) => setData('komentar', e.target.value)}
                                            />

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="mt-2 px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 disabled:opacity-50"
                                            >
                                                Kirim Komentar
                                            </button>
                                        </form>
                                    )}

                                </div>
                            )}
                        </motion.div>

                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
