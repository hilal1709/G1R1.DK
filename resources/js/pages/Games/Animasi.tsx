import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function GameAnimasi() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const steps = [
    {
      title: 'Persiapan Bahan',
      description: 'Memilih bambu berkualitas dan kertas warna-warni',
      time: 0,
    },
    {
      title: 'Pembuatan Kerangka',
      description: 'Merakit bambu menjadi kerangka Damar Kurung',
      time: 30,
    },
    {
      title: 'Pemasangan Kertas',
      description: 'Menempelkan kertas dengan motif tradisional',
      time: 60,
    },
    {
      title: 'Dekorasi',
      description: 'Menambahkan hiasan dan detail akhir',
      time: 90,
    },
    {
      title: 'Finishing',
      description: 'Pengecekan kualitas dan pengemasan',
      time: 120,
    },
  ];

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const jumpToStep = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
    if (!isPlaying) {
      video.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head title="Game Animasi - Damar Kurung Gresik" />

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
              🎬 Proses Pembuatan Damar Kurung
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90"
            >
              Saksikan keahlian pengrajin dalam membuat Damar Kurung
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Video */}
                <div className="relative aspect-video bg-gray-900">
                  <video
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full"
                    poster="/images/damar-kurung-poster.jpg"
                  >
                    <source src="/videos/damar-kurung-process.mp4" type="video/mp4" />
                    Browser Anda tidak mendukung video tag.
                  </video>

                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button
                        onClick={handlePlayPause}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <svg className="w-10 h-10 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Video placeholder (no actual video) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                    <div className="text-center">
                      <svg className="w-24 h-24 mx-auto text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 text-lg">Video Placeholder</p>
                      <p className="text-gray-500 text-sm mt-2">Upload video proses pembuatan di sini</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-6 space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause */}
                      <button
                        onClick={handlePlayPause}
                        className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all"
                      >
                        {isPlaying ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Volume */}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24"
                        />
                      </div>

                      {/* Speed */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Kecepatan:</span>
                        {[0.5, 1, 1.5, 2].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                              playbackSpeed === speed
                                ? 'bg-amber-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Video</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Video ini menampilkan proses lengkap pembuatan Damar Kurung dari awal hingga akhir.
                  Saksikan keahlian para pengrajin yang telah mewarisi teknik tradisional turun-temurun
                  dalam menciptakan kerajinan indah ini.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-amber-600 font-bold text-2xl mb-1">5-7 Hari</div>
                    <div className="text-gray-600 text-sm">Waktu Pembuatan</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-amber-600 font-bold text-2xl mb-1">3-5 Orang</div>
                    <div className="text-gray-600 text-sm">Tim Pengrajin</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="text-amber-600 font-bold text-2xl mb-1">100% Handmade</div>
                    <div className="text-gray-600 text-sm">Kualitas Terjamin</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline Steps */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tahapan Pembuatan</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => jumpToStep(step.time)}
                      className="w-full text-left p-4 rounded-xl hover:bg-amber-50 transition-colors border-2 border-gray-100 hover:border-amber-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <div className="text-xs text-amber-600 mt-2">{formatTime(step.time)}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Tertarik Belajar?</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Ikuti workshop pembuatan Damar Kurung kami!
                  </p>
                  <Link
                    href="/events"
                    className="block w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold text-center hover:shadow-lg transition-all"
                  >
                    Lihat Workshop
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
