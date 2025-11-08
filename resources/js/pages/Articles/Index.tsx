import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Calendar,
    User,
    Tag,
    CheckCircle,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

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
    created_at: string;
    updated_at: string;
}

interface PageProps {
    articles: {
        data: Article[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ArticlesIndex({ articles }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (
            confirm(
                'Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.',
            )
        ) {
            router.delete(`/articles/${id}`);
        }
    };

    const filteredArticles = articles.data.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <Head title="Kelola Artikel" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Kelola Artikel
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Tambah, edit, dan hapus artikel Damar Kurung
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Kembali
                                </Link>
                                <Link
                                    href="/articles/create"
                                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <Plus className="h-5 w-5" />
                                    Tambah Artikel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-md p-6 mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="text-sm text-gray-600">
                                Total: <strong>{articles.total}</strong> artikel
                            </div>
                        </div>
                    </motion.div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                                    {article.image ? (
                                        <img
                                            src={`/storage/${article.image}`}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Tag className="h-16 w-16 text-blue-300" />
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3">
                                        {article.is_published ? (
                                            <span className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                                <CheckCircle className="h-3 w-3" />
                                                Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                                <XCircle className="h-3 w-3" />
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {article.excerpt ||
                                            article.content.substring(0, 150) +
                                                '...'}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        {article.author && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <User className="h-4 w-4" />
                                                {article.author}
                                            </div>
                                        )}
                                        {article.category && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Tag className="h-4 w-4" />
                                                {article.category}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(
                                                article.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Lihat
                                        </Link>
                                        <Link
                                            href={`/articles/${article.id}/edit`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(article.id)
                                            }
                                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredArticles.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
                                <Search className="h-16 w-16 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Tidak ada artikel
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchQuery
                                    ? 'Artikel yang Anda cari tidak ditemukan'
                                    : 'Mulai tambahkan artikel pertama Anda'}
                            </p>
                            {!searchQuery && (
                                <Link
                                    href="/articles/create"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                >
                                    <Plus className="h-5 w-5" />
                                    Tambah Artikel
                                </Link>
                            )}
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {articles.last_page > 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 flex justify-center gap-2"
                        >
                            {articles.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        link.active
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
