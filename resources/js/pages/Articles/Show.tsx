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
    article: Article;
}

export default function ArticleShow({ article }: PageProps) {
    return (
        <>
            <Head title={article.title} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/articles" />

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/articles"
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    Kembali
                                </Link>
                                {article.is_published ? (
                                    <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                                        <CheckCircle className="h-5 w-5" />
                                        Published
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold">
                                        <XCircle className="h-5 w-5" />
                                        Draft
                                    </span>
                                )}
                            </div>
                            <Link
                                href={`/articles/${article.id}/edit`}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                            >
                                <Edit className="h-5 w-5" />
                                Edit Artikel
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Featured Image */}
                        {article.image && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100"
                            >
                                <img
                                    src={`/storage/${article.image}`}
                                    alt={article.title}
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        )}

                        {/* Article Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-amber-100 shadow-lg p-8 mb-6"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {article.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-4 pb-6 border-b border-amber-200">
                                {article.author && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="h-5 w-5 text-amber-600" />
                                        <span className="font-medium">
                                            {article.author}
                                        </span>
                                    </div>
                                )}

                                {article.category && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Tag className="h-5 w-5 text-amber-600" />
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                                            {article.category}
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
                                    {article.content}
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
                    </div>
                </div>
            </div>
        </>
    );
}
