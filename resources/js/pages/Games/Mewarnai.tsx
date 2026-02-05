import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import { PageProps } from '@/types';
import { Paintbrush, Droplet } from 'lucide-react';
import TraditionalHeader from '@/components/TraditionalHeader';
import BatikPattern from '@/components/BatikPattern';

interface GameDesign {
    id: number;
    nama: string;
    level: 'mudah' | 'sedang' | 'sulit';
    deskripsi: string;
    path_data: any[];
    thumbnail: string | null;
    is_active: boolean;
}

interface Props extends PageProps {
    designs: GameDesign[];
}

export default function GameMewarnai({ auth, designs = [] }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState('#FF6B00');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'mudah' | 'sedang' | 'sulit'>('mudah');
  const [selectedDesign, setSelectedDesign] = useState<GameDesign | null>(null);
  const [tool, setTool] = useState<'brush' | 'bucket'>('brush');

  const isAdmin = auth?.user?.role === 'admin';

  const levels = [
    { id: 'mudah', name: 'Mudah', description: 'Desain sederhana untuk pemula' },
    { id: 'sedang', name: 'Sedang', description: 'Desain dengan detail menengah' },
    { id: 'sulit', name: 'Sulit', description: 'Desain kompleks dengan banyak detail' },
  ];

  // Get designs for selected level
  const levelDesigns = designs.filter(d => d.level === selectedLevel);

  useEffect(() => {
    // Auto select first design when level changes
    if (levelDesigns.length > 0 && !selectedDesign) {
      setSelectedDesign(levelDesigns[0]);
    } else if (levelDesigns.length > 0 && selectedDesign) {
      // Check if current design is still in the level
      const stillInLevel = levelDesigns.find(d => d.id === selectedDesign.id);
      if (!stillInLevel) {
        setSelectedDesign(levelDesigns[0]);
      }
    }
  }, [selectedLevel, levelDesigns]);

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

    // Draw design from database
    drawDesignOutline(ctx);
  }, [selectedDesign]);

  const drawDesignOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (!selectedDesign || !selectedDesign.path_data) {
      // Fallback: draw simple placeholder if no design selected
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(200, 150, 400, 300);
      ctx.font = '20px Arial';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText('Belum ada desain tersedia', 400, 300);
      return;
    }

    // Draw paths from database
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;

    selectedDesign.path_data.forEach((path: any[]) => {
      if (!Array.isArray(path) || path.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);

      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }

      ctx.stroke();
    });
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Get starting pixel color
    const startPos = (startY * canvas.width + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];

    // Convert fill color to RGB
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillData = tempCtx.getImageData(0, 0, 1, 1).data;
    const fillR = fillData[0];
    const fillG = fillData[1];
    const fillB = fillData[2];

    // Don't fill if colors are the same
    if (startR === fillR && startG === fillG && startB === fillB) return;

    // Flood fill algorithm using stack
    const pixelStack: Array<[number, number]> = [[startX, startY]];
    const visited = new Set<string>();

    while (pixelStack.length > 0) {
      const [x, y] = pixelStack.pop()!;
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const pos = (y * canvas.width + x) * 4;
      const r = pixels[pos];
      const g = pixels[pos + 1];
      const b = pixels[pos + 2];
      const a = pixels[pos + 3];

      // Check if pixel matches start color
      if (r !== startR || g !== startG || b !== startB || a !== startA) continue;

      visited.add(key);

      // Fill pixel
      pixels[pos] = fillR;
      pixels[pos + 1] = fillG;
      pixels[pos + 2] = fillB;
      pixels[pos + 3] = 255;

      // Add adjacent pixels
      pixelStack.push([x + 1, y]);
      pixelStack.push([x - 1, y]);
      pixelStack.push([x, y + 1]);
      pixelStack.push([x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    if (tool === 'bucket') {
      floodFill(x, y, currentColor);
    } else {
      setIsDrawing(true);
      draw(e);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;
    if (tool !== 'brush') return;

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

    drawDesignOutline(ctx);
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
        <PublicNavbar activeMenu="/games" />

        {/* Header */}
        <TraditionalHeader
          title="Game Mewarnai Damar Kurung"
          subtitle="Warnai Damar Kurung dengan kreativitas Anda!"
          variant="primary"
        />

        {/* Background with Batik Pattern */}
        <div className="relative min-h-screen">
          <div className="absolute inset-0 text-amber-900 opacity-[0.03]">
            <BatikPattern />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Tools Panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Alat Mewarnai</h2>

                {/* Level Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Pilih Level</h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id as 'mudah' | 'sedang' | 'sulit')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                          selectedLevel === level.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="font-bold">{level.name}</div>
                        <div className={`text-xs ${selectedLevel === level.id ? 'text-white/90' : 'text-gray-500'}`}>
                          {level.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Design Selection */}
                {levelDesigns.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">Pilih Desain</h3>
                      {isAdmin && (
                        <Link
                          href="/game-designs/create"
                          className="text-xs text-orange-600 hover:text-orange-800 font-semibold"
                        >
                          + Tambah
                        </Link>
                      )}
                    </div>
                    <div className="space-y-2">
                      {levelDesigns.map((design) => (
                        <button
                          key={design.id}
                          onClick={() => setSelectedDesign(design)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                            selectedDesign?.id === design.id
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="font-medium">{design.nama}</div>
                          {design.deskripsi && (
                            <div className={`text-xs ${selectedDesign?.id === design.id ? 'text-white/90' : 'text-gray-500'}`}>
                              {design.deskripsi}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {levelDesigns.length === 0 && (
                  <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 mb-2">
                      Belum ada desain untuk level ini.
                    </p>
                    {isAdmin && (
                      <Link
                        href="/game-designs/create"
                        className="inline-block mt-2 text-sm font-semibold text-orange-600 hover:text-orange-800 underline"
                      >
                        Tambah Desain Baru
                      </Link>
                    )}
                  </div>
                )}

                {/* Tool Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Pilih Alat</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTool('brush')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                        tool === 'brush'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Paintbrush className={`h-6 w-6 mb-2 ${
                        tool === 'brush' ? 'text-white' : 'text-gray-600'
                      }`} />
                      <span className="text-xs font-semibold">Kuas</span>
                    </button>
                    <button
                      onClick={() => setTool('bucket')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                        tool === 'bucket'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Droplet className={`h-6 w-6 mb-2 ${
                        tool === 'bucket' ? 'text-white' : 'text-gray-600'
                      }`} />
                      <span className="text-xs font-semibold">Isi Area</span>
                    </button>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Pilih Warna</h3>
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

                {/* Brush Size - only show for brush tool */}
                {tool === 'brush' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={clearCanvas}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={downloadImage}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    Download
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
                    className={`max-w-full ${tool === 'brush' ? 'cursor-crosshair' : 'cursor-pointer'}`}
                    style={{ touchAction: 'none' }}
                  />
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  {tool === 'brush'
                    ? 'Tip: Gunakan kuas untuk mewarnai dengan detail!'
                    : 'Tip: Klik area yang ingin diwarnai untuk mengisi seluruh area dengan warna yang dipilih!'}
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
      </div>
    </>
  );
}
