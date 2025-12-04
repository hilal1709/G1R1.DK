import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Plus,
    Eye,
    TrendingUp,
    Users,
    BookOpen,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard.url(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-sidebar-border dark:from-blue-950 dark:to-indigo-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Artikel
                                </p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    0
                                </h3>
                            </div>
                            <div className="rounded-full bg-blue-500 p-3">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:border-sidebar-border dark:from-green-950 dark:to-emerald-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Artikel Published
                                </p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    0
                                </h3>
                            </div>
                            <div className="rounded-full bg-green-500 p-3">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-amber-50 to-orange-50 p-6 dark:border-sidebar-border dark:from-amber-950 dark:to-orange-950">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Views
                                </p>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    0
                                </h3>
                            </div>
                            <div className="rounded-full bg-amber-500 p-3">
                                <Eye className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        href="/articles"
                        className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 transition-all hover:shadow-lg dark:border-sidebar-border dark:bg-sidebar"
                    >
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-blue-100 p-4 group-hover:bg-blue-200 transition-colors dark:bg-blue-900">
                                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Kelola Artikel
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Lihat, edit, dan hapus artikel
                                </p>
                            </div>
                            <div className="text-gray-400">→</div>
                        </div>
                    </Link>

                    <Link
                        href="/articles/create"
                        className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-gradient-to-br from-blue-600 to-indigo-600 p-6 transition-all hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-white/20 p-4 group-hover:bg-white/30 transition-colors">
                                <Plus className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white">
                                    Tambah Artikel Baru
                                </h3>
                                <p className="text-sm text-blue-100">
                                    Buat artikel baru tentang Damar Kurung
                                </p>
                            </div>
                            <div className="text-white">→</div>
                        </div>
                    </Link>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-sidebar">
                    <div className="text-center py-12">
                        <div className="inline-block p-6 bg-gray-100 rounded-full mb-4 dark:bg-gray-800">
                            <Users className="h-16 w-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
                            Selamat Datang di Dashboard
                        </h3>
                        <p className="text-gray-600 mb-6 dark:text-gray-400">
                            Kelola artikel Damar Kurung Gresik dengan mudah
                        </p>
                        <Link
                            href="/articles/create"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Plus className="h-5 w-5" />
                            Mulai Tambah Artikel
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
