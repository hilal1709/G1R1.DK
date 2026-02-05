import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';

interface GameDesign {
    id: number;
    nama: string;
    level: 'mudah' | 'sedang' | 'sulit';
    deskripsi: string;
    path_data: any;
    thumbnail: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    designs: GameDesign[];
}

export default function Index({ auth, designs }: Props) {
    const getLevelBadgeColor = (level: string) => {
        switch (level) {
            case 'mudah':
                return 'bg-green-100 text-green-800';
            case 'sedang':
                return 'bg-yellow-100 text-yellow-800';
            case 'sulit':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleToggleActive = (id: number) => {
        router.patch(`/game-designs/${id}`, { toggle_active: true }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number, nama: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus desain "${nama}"?`)) {
            router.delete(`/game-designs/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Kelola Desain Game', href: '' }
            ]}
        >
            <Head title="Kelola Desain Game" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Kelola Desain Game Mewarnai
                        </h2>
                        <Link
                            href="/game-designs/create"
                            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                        >
                            Tambah Desain Baru
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {designs.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">Belum ada desain game.</p>
                                    <Link
                                        href="/game-designs/create"
                                        className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                                    >
                                        Tambah Desain Pertama
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Nama
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Level
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Deskripsi
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {designs.map((design) => (
                                                <tr key={design.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {design.nama}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 capitalize ${getLevelBadgeColor(design.level)}`}>
                                                            {design.level}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                                            {design.deskripsi}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <button
                                                            onClick={() => handleToggleActive(design.id)}
                                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                                design.is_active
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            {design.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </button>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        <Link
                                                            href={`/game-designs/${design.id}/edit`}
                                                            className="text-orange-600 hover:text-orange-900 mr-4"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(design.id, design.nama)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
