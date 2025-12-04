import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function GameMewarnai() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#FF6B00');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    { name: 'Orange', value: '#FF6B00' },
    { name: 'Kuning', value: '#FFD700' },
    { name: 'Merah', value: '#DC2626' },
    { name: 'Hijau', value: '#16A34A' },
    { name: 'Biru', value: '#2563EB' },
    { name: 'Ungu', value: '#9333EA' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Coklat', value: '#92400E' },
    { name: 'Hitam', value: '#000000' },
    { name: 'Putih', value: '#FFFFFF' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Draw Damar Kurung outline
    drawDamarKurungOutline(ctx);
  }, []);

  const drawDamarKurungOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;

    // Damar Kurung traditional pattern outline
    // Main frame (lantern shape)
    ctx.beginPath();
    ctx.moveTo(400, 50);
    ctx.lineTo(500, 150);
    ctx.lineTo(500, 450);
    ctx.lineTo(400, 550);
    ctx.lineTo(300, 450);
    ctx.lineTo(300, 150);
    ctx.closePath();
    ctx.stroke();

    // Top decoration
    ctx.beginPath();
    ctx.arc(400, 50, 30, 0, Math.PI * 2);
    ctx.stroke();

    // Inner decorative lines
    for (let i = 0; i < 4; i++) {
      const y = 150 + (i * 75);
      ctx.beginPath();
      ctx.moveTo(300, y);
      ctx.lineTo(500, y);
      ctx.stroke();
    }

    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(350, 150);
    ctx.lineTo(350, 450);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(450, 150);
    ctx.lineTo(450, 450);
    ctx.stroke();

    // Decorative patterns
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = 325 + (j * 75);
        const y = 187.5 + (i * 75);

        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.stroke();

        // Small flower pattern
        for (let k = 0; k < 4; k++) {
          const angle = (k * Math.PI) / 2;
          const px = x + Math.cos(angle) * 10;
          const py = y + Math.sin(angle) * 10;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Bottom handle
    ctx.beginPath();
    ctx.moveTo(400, 550);
    ctx.lineTo(400, 580);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 580, 10, 0, Math.PI * 2);
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawDamarKurungOutline(ctx);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'damar-kurung-mewarnai.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <Head title="Game Mewarnai - Damar Kurung Gresik" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DK</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Damar Kurung
                </span>
              </Link>

              <div className="flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-amber-600">Beranda</Link>
                <Link href="/products" className="text-gray-700 hover:text-amber-600">Produk</Link>
                <Link href="/events" className="text-gray-700 hover:text-amber-600">Event</Link>
                <Link href="/games" className="text-amber-600 font-semibold">Games</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-12 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              🎨 Game Mewarnai Damar Kurung
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90"
            >
              Warnai Damar Kurung dengan kreativitas Anda!
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Tools Panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Alat Mewarnai</h2>

                {/* Color Palette */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Pilih Warna</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setCurrentColor(color.value)}
                        className={`w-12 h-12 rounded-lg transition-all hover:scale-110 ${
                          currentColor === color.value
                            ? 'ring-4 ring-amber-500 ring-offset-2'
                            : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>

                  {/* Custom Color */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Warna Custom
                    </label>
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Brush Size */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ukuran Kuas: {brushSize}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={clearCanvas}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    🗑️ Reset
                  </button>
                  <button
                    onClick={downloadImage}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    💾 Download
                  </button>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-blue-900 mb-2">Cara Bermain:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Pilih warna dari palet</li>
                    <li>• Klik dan drag untuk mewarnai</li>
                    <li>• Atur ukuran kuas sesuai kebutuhan</li>
                    <li>• Download hasil karya Anda!</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Canvas */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Kanvas Mewarnai</h2>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-gray-300"
                      style={{ backgroundColor: currentColor }}
                    />
                    <span className="text-sm text-gray-600">Warna: {currentColor}</span>
                  </div>
                </div>

                <div className="border-4 border-gray-200 rounded-xl overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="cursor-crosshair max-w-full"
                    style={{ touchAction: 'none' }}
                  />
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  💡 Tip: Gunakan warna-warna cerah untuk membuat Damar Kurung yang indah!
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Tentang Damar Kurung</h3>
                <p className="text-gray-700">
                  Damar Kurung adalah kerajinan tradisional Gresik berupa lentera hias yang terbuat dari
                  bambu dan kertas berwarna-warni. Motif-motif tradisional pada Damar Kurung mencerminkan
                  kearifan lokal dan keindahan seni rupa Nusantara.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
