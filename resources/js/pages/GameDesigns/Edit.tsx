import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEventHandler, useRef, useEffect, useState } from 'react';

interface GameDesign {
    id: number;
    nama: string;
    level: 'mudah' | 'sedang' | 'sulit';
    deskripsi: string;
    path_data: any[];
    thumbnail: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    design: GameDesign;
}

export default function Edit({ auth, design }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState<any[]>(design.path_data || []);
    const [currentPath, setCurrentPath] = useState<any[]>([]);
    const [uploadMethod, setUploadMethod] = useState<'draw' | 'file'>('draw');

    const { data, setData, put, processing, errors } = useForm({
        nama: design.nama,
        level: design.level,
        deskripsi: design.deskripsi,
        path_data: JSON.stringify(design.path_data || []),
        is_active: design.is_active,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw all saved paths
        paths.forEach((path) => {
            if (path.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo(path[i].x, path[i].y);
            }
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw current path
        if (currentPath.length > 0) {
            ctx.beginPath();
            ctx.moveTo(currentPath[0].x, currentPath[0].y);
            for (let i = 1; i < currentPath.length; i++) {
                ctx.lineTo(currentPath[i].x, currentPath[i].y);
            }
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }, [paths, currentPath]);

    const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const coords = getCanvasCoordinates(e);
        setCurrentPath([coords]);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const coords = getCanvasCoordinates(e);
        setCurrentPath((prev) => [...prev, coords]);
    };

    const handleMouseUp = () => {
        if (isDrawing && currentPath.length > 0) {
            setPaths((prev) => [...prev, currentPath]);
            setCurrentPath([]);
        }
        setIsDrawing(false);
    };

    const handleClearCanvas = () => {
        setPaths([]);
        setCurrentPath([]);
    };

    const handleUndo = () => {
        setPaths((prev) => prev.slice(0, -1));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const jsonData = JSON.parse(content);

                if (Array.isArray(jsonData)) {
                    setPaths(jsonData);
                    alert('File berhasil diupload!');
                } else {
                    alert('Format file tidak valid. File harus berisi array of paths.');
                }
            } catch (error) {
                alert('Gagal membaca file. Pastikan file adalah JSON yang valid.');
            }
        };
        reader.readAsText(file);
    };

    const handleDownloadTemplate = () => {
        const template = [
            [
                { x: 300, y: 100 },
                { x: 400, y: 100 },
                { x: 500, y: 200 },
                { x: 500, y: 450 },
                { x: 400, y: 520 },
                { x: 300, y: 450 },
                { x: 300, y: 200 },
                { x: 300, y: 100 }
            ]
        ];

        const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'template-desain.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadCurrent = () => {
        if (paths.length === 0) {
            alert('Tidak ada desain untuk didownload');
            return;
        }

        const blob = new Blob([JSON.stringify(paths, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${design.nama.replace(/\s+/g, '-').toLowerCase()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Konversi paths ke format JSON
        const pathData = JSON.stringify(paths);
        setData('path_data', pathData);

        put(route('game-designs.update', design.id));
    };

    useEffect(() => {
        // Update path_data ketika paths berubah
        setData('path_data', JSON.stringify(paths));
    }, [paths]);

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: '/dashboard' },
                { title: 'Kelola Desain Game', href: '/game-designs' },
                { title: `Edit: ${design.nama}`, href: '' }
            ]}
        >
            <Head title={`Edit ${design.nama}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Edit Desain: {design.nama}
                        </h2>
                        <Link
                            href="/games/mewarnai"
                            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
                        >
                            Kembali
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                            Nama Desain *
                                        </label>
                                        <input
                                            id="nama"
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData('nama', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            required
                                        />
                                        {errors.nama && <p className="mt-1 text-sm text-red-600">{errors.nama}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                            Level Kesulitan *
                                        </label>
                                        <select
                                            id="level"
                                            value={data.level}
                                            onChange={(e) => setData('level', e.target.value as 'mudah' | 'sedang' | 'sulit')}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                            required
                                        >
                                            <option value="mudah">Mudah</option>
                                            <option value="sedang">Sedang</option>
                                            <option value="sulit">Sulit</option>
                                        </select>
                                        {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            id="deskripsi"
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        />
                                        {errors.deskripsi && <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>}
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                            Aktifkan desain ini
                                        </label>
                                    </div>

                                    <div className="rounded-md bg-blue-50 p-4">
                                        <div className="text-sm text-blue-700">
                                            <p className="font-medium">Info:</p>
                                            <p className="mt-1">Dibuat: {new Date(design.created_at).toLocaleDateString('id-ID')}</p>
                                            <p>Terakhir diubah: {new Date(design.updated_at).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Canvas Drawing Area */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gambar Desain *
                                        </label>

                                        {/* Method Selection */}
                                        <div className="mb-4 flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setUploadMethod('draw')}
                                                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                                                    uploadMethod === 'draw'
                                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                                }`}
                                            >
                                                Gambar Manual
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUploadMethod('file')}
                                                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                                                    uploadMethod === 'file'
                                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                                }`}
                                            >
                                                Upload File
                                            </button>
                                        </div>

                                        {uploadMethod === 'file' && (
                                            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-sm text-blue-700 mb-3">
                                                    Upload file JSON yang berisi data path untuk desain.
                                                </p>
                                                <div className="flex gap-2 mb-3">
                                                    <button
                                                        type="button"
                                                        onClick={handleDownloadTemplate}
                                                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        Download Template
                                                    </button>
                                                    <span className="text-gray-400">|</span>
                                                    <button
                                                        type="button"
                                                        onClick={handleDownloadCurrent}
                                                        className="text-sm text-green-600 hover:text-green-800 underline"
                                                    >
                                                        Download Desain Saat Ini
                                                    </button>
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".json"
                                                    onChange={handleFileUpload}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                                />
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-500 mb-4">
                                            {uploadMethod === 'draw'
                                                ? 'Klik dan drag untuk menggambar outline desain Damar Kurung'
                                                : 'Preview desain dari file yang diupload'}
                                        </p>
                                        <canvas
                                            ref={canvasRef}
                                            width={500}
                                            height={500}
                                            onMouseDown={uploadMethod === 'draw' ? handleMouseDown : undefined}
                                            onMouseMove={uploadMethod === 'draw' ? handleMouseMove : undefined}
                                            onMouseUp={uploadMethod === 'draw' ? handleMouseUp : undefined}
                                            onMouseLeave={uploadMethod === 'draw' ? handleMouseUp : undefined}
                                            className={`border-2 border-gray-300 rounded-lg bg-white ${uploadMethod === 'draw' ? 'cursor-crosshair' : ''}`}
                                            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleUndo}
                                            disabled={paths.length === 0}
                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Undo
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearCanvas}
                                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                                        >
                                            Hapus Semua
                                        </button>
                                    </div>

                                    {paths.length === 0 && (
                                        <p className="text-sm text-red-600">Desain tidak boleh kosong</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-4">
                                <Link
                                    href="/game-designs"
                                    className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-400"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || paths.length === 0}
                                    className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
