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

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/articles"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Edit className="h-5 w-5" />
                                Edit Artikel
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Featured Image */}
                        {article.image && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={`/storage/${article.image}`}
                                    alt={article.title}
                                    className="w-full h-[400px] object-cover"
                                />
                            </motion.div>
                        )}

                        {/* Article Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-8 mb-6"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                {article.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-200">
                                {article.author && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="h-5 w-5 text-blue-600" />
                                        <span className="font-medium">
                                            {article.author}
                                        </span>
                                    </div>
                                )}

                                {article.category && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Tag className="h-5 w-5 text-blue-600" />
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                            {article.category}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar className="h-5 w-5 text-blue-600" />
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

                        {/* Article Excerpt */}
                        {article.excerpt && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6 mb-6"
                            >
                                <p className="text-lg text-gray-700 italic">
                                    {article.excerpt}
                                </p>
                            </motion.div>
                        )}

                        {/* Article Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-8"
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
                            className="mt-8 p-4 bg-white rounded-xl shadow-md"
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
