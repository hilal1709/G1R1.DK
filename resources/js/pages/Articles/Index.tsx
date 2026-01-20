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
import PublicNavbar from '@/components/PublicNavbar';

interface Article {
    id: number;
    judul: string;       // judul artikel
    isi: string | null;  // isi artikel
    article_medias?: { file_path: string }[];
    user: { name: string } | null; // author
    comments: any[];
    created_at: string;
    updated_at: string;
}

interface PageProps {
    articles: {
        data: Article[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    auth?: {
        user?: {
            role?: string;
        };
    };
}

export default function ArticlesIndex({ articles, auth  }: PageProps) {
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
        article.judul.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    

    return (
        <>
            <Head title="Kelola Artikel" />

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
                                    Kelola Artikel
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-amber-100 text-lg"
                                >
                                    Tambah, edit, dan hapus artikel Damar Kurung
                                </motion.p>
                            </div>
                            {auth?.user?.role === 'admin' && (
                            <>
                            <Link
                                href="/articles/create"
                                className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                            >
                                <Plus className="h-5 w-5" />
                                Tambah Artikel
                            </Link>
                            </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg border border-amber-100 p-6 mb-8"
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
                                    className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-gray-900"
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
                                className="group bg-white rounded-xl border border-amber-100 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                                    {article.article_medias?.length ? (
                                        <img
                                            src={article.article_medias[0].file_path}
                                            alt={article.judul}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Tag className="h-16 w-16 text-amber-300" />
                                        </div>
                                    )}
                                
                                    
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                        {article.judul}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {article.isi ||
                                            article.isi?.substring(0, 150) +
                                                '...'}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4">
                                        {article.user && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <User className="h-4 w-4" />
                                                {article.user.name}
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
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors font-semibold"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Lihat
                                        </Link>
                                        {auth?.user?.role === 'admin' && (
                                        <>
                                        <Link
                                            href={`/articles/${article.id}/edit`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-semibold"
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
                                        </>
                                        )}
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
