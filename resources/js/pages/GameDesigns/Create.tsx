import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { FormEventHandler, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Download, Palette } from 'lucide-react';
import PublicNavbar from '@/components/PublicNavbar';
import TraditionalHeader from '@/components/TraditionalHeader';
import BatikPattern from '@/components/BatikPattern';

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState<any[]>([]);
    const [uploadMethod, setUploadMethod] = useState<'draw' | 'file'>('draw');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        level: 'mudah' as 'mudah' | 'sedang' | 'sulit',
        deskripsi: '',
        path_data: '[]',
        image: null as File | null,
        is_active: true,
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

        // Validasi tipe file
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            alert('Format file tidak valid. Gunakan JPG, PNG, atau SVG.');
            return;
        }

        // Set image file ke form data
        setData('image', file);

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Konversi paths ke format JSON
        const pathData = JSON.stringify(paths);
        setData('path_data', pathData);

        post(route('game-designs.store'));
    };

    useEffect(() => {
        // Update path_data ketika paths berubah
        setData('path_data', JSON.stringify(paths));
    }, [paths]);

    return (
        <>
            <Head title="Tambah Desain Game" />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <PublicNavbar activeMenu="/games" />

                {/* Header */}
                <TraditionalHeader
                    title="Tambah Desain Game Baru"
                    subtitle="Buat desain baru untuk game mewarnai Damar Kurung"
                    variant="primary"
                >
                    <Link
                        href="/games/mewarnai"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl font-bold"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Kembali
                    </Link>
                </TraditionalHeader>

                {/* Background with Batik Pattern */}
                <div className="relative min-h-screen">
                    <div className="absolute inset-0 text-amber-900 opacity-[0.03]">
                        <BatikPattern />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <form onSubmit={submit}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Nama Desain */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                                        <Palette className="h-5 w-5 text-amber-600" />
                                        Nama Desain *
                                    </label>
                                    <input
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-lg font-semibold text-gray-900"
                                        placeholder="Contoh: Damar Kurung Klasik"
                                    />
                                    {errors.nama && (
                                        <p className="mt-2 text-sm text-red-600">{errors.nama}</p>
                                    )}
                                </motion.div>

                                {/* Level & Deskripsi */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6 space-y-6"
                                >
                                    <div>
                                        <label htmlFor="level" className="block text-sm font-bold text-gray-900 mb-3">
                                            Level Kesulitan *
                                        </label>
                                        <select
                                            id="level"
                                            value={data.level}
                                            onChange={(e) => setData('level', e.target.value as 'mudah' | 'sedang' | 'sulit')}
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 font-semibold text-gray-900"
                                        >
                                            <option value="">Pilih Level</option>
                                            <option value="mudah">🟢 Mudah</option>
                                            <option value="sedang">🟡 Sedang</option>
                                            <option value="sulit">🔴 Sulit</option>
                                        </select>
                                        {errors.level && (
                                            <p className="mt-2 text-sm text-red-600">{errors.level}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="deskripsi" className="block text-sm font-bold text-gray-900 mb-3">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            id="deskripsi"
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                            rows={4}
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 font-medium text-gray-900"
                                            placeholder="Jelaskan tentang desain ini..."
                                        />
                                        {errors.deskripsi && (
                                            <p className="mt-2 text-sm text-red-600">{errors.deskripsi}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                                        />
                                        <label htmlFor="is_active" className="ml-3 block text-sm font-medium text-gray-900">
                                            Aktifkan desain ini setelah disimpan
                                        </label>
                                    </div>
                                </motion.div>

                                {/* Canvas / Upload Area */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                            <Palette className="h-5 w-5 text-amber-600" />
                                            Gambar Desain *
                                        </label>

                                        {/* Method Toggle */}
                                        <div className="flex gap-2 bg-amber-50 rounded-lg p-1">
                                            <button
                                                type="button"
                                                onClick={() => setUploadMethod('draw')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                                    uploadMethod === 'draw'
                                                        ? 'bg-white text-amber-700 shadow-md'
                                                        : 'text-gray-900 hover:text-amber-600'
                                                }`}
                                            >
                                                <Palette className="h-4 w-4" />
                                                Gambar Manual
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUploadMethod('file')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                                    uploadMethod === 'file'
                                                        ? 'bg-white text-amber-700 shadow-md'
                                                        : 'text-gray-900 hover:text-amber-600'
                                                }`}
                                            >
                                                <Upload className="h-4 w-4" />
                                                Upload File
                                            </button>
                                        </div>
                                    </div>

                                    {uploadMethod === 'file' && (
                                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <p className="text-sm text-blue-900 mb-3 font-bold">
                                                📁 Upload gambar desain (JPG, PNG, atau SVG)
                                            </p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg,image/png,image/svg+xml,.jpg,.jpeg,.png,.svg"
                                                onChange={handleFileUpload}
                                                className="block w-full text-sm text-gray-900 font-medium file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200 cursor-pointer"
                                            />
                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-sm font-bold text-gray-900">Preview:</p>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="text-sm text-red-600 hover:text-red-800 font-bold"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="max-w-full h-auto rounded-lg border-2 border-gray-300"
                                                        style={{ maxHeight: '300px' }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {uploadMethod === 'draw' && (
                                        <p className="text-sm text-gray-900 mb-3 font-bold">
                                            🖱️ Klik dan drag untuk menggambar outline desain Damar Kurung
                                        </p>
                                    )}

                                    {uploadMethod === 'draw' && (
                                        <canvas
                                            ref={canvasRef}
                                            width={500}
                                            height={500}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                            onMouseLeave={handleMouseUp}
                                            className="border-2 border-amber-200 rounded-lg bg-white shadow-sm cursor-crosshair hover:border-amber-400"
                                            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
                                        />
                                    )}

                                    {uploadMethod === 'draw' && (
                                        <div className="mt-4 flex gap-2 flex-wrap">
                                            <button
                                                type="button"
                                                onClick={handleUndo}
                                                disabled={paths.length === 0}
                                                className="px-4 py-2 text-sm font-bold text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                Undo
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleClearCanvas}
                                                disabled={paths.length === 0}
                                                className="px-4 py-2 text-sm font-bold text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                Hapus Semua
                                            </button>
                                        </div>
                                    )}
                                    {errors.path_data && (
                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.path_data}</p>
                                    )}
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.image}</p>
                                    )}
                                </motion.div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white rounded-xl border border-amber-100 shadow-lg p-6"
                                >
                                    <button
                                        type="submit"
                                        disabled={processing || (uploadMethod === 'draw' && paths.length === 0) || (uploadMethod === 'file' && !data.image)}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                                    >
                                        <Save className="h-5 w-5" />
                                        {processing ? 'Menyimpan...' : 'Simpan Desain'}
                                    </button>
                                    {uploadMethod === 'draw' && paths.length === 0 && (
                                        <p className="mt-3 text-xs text-center text-red-600 font-semibold">
                                            Gambar desain terlebih dahulu
                                        </p>
                                    )}
                                    {uploadMethod === 'file' && !data.image && (
                                        <p className="mt-3 text-xs text-center text-red-600 font-semibold">
                                            Upload gambar terlebih dahulu
                                        </p>
                                    )}
                                </motion.div>

                                {/* Help Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-lg p-6"
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Tips</h3>
                                    <ul className="space-y-2 text-sm text-gray-900 font-bold">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span>Gunakan <strong>Gambar Manual</strong> untuk menggambar langsung di canvas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span>Gunakan <strong>Upload File</strong> untuk upload gambar JPG, PNG, atau SVG</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span>Format gambar yang didukung: JPG, PNG, SVG</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span>Aktifkan desain agar muncul di halaman game</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}
