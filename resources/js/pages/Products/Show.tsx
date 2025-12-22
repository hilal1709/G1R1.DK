import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import ReviewForm from '@/components/ReviewForm';
import RatingStars from '@/components/RatingStars';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import { formatWhatsAppMessage, openWhatsApp, openShopee, formatRupiah, WHATSAPP_BUSINESS } from '@/lib/constants';

interface Review {
  id: number;
  user: {
    name: string;
  };
  rating: number;
  komentar: string;
  created_at: string;
  images?: Array<{
    id: number;
    gambar: string;
  }>;
}

interface Comment {
  id: number;
  komentar: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface Product {
  id: number;
  nama: string;
  slug?: string;
  deskripsi: string;
  harga: number;
  stok: number;
  sku: string;
  shopee_link: string | null;
  average_rating?: number;
  review_count?: number;
  category?: {
    id: number;
    nama: string;
  };
  images?: Array<{
    id: number;
    gambar: string;
  }>;
}

interface Props {
  product: Product;
  reviews?: Review[];
  comments?: Comment[];
  relatedProducts?: Product[];
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
}

export default function ProductShow({ product, reviews = [], comments = [], relatedProducts, auth }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [currentStok, setCurrentStok] = useState(product.stok);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [stokChanged, setStokChanged] = useState(false);

  const formatPrice = formatRupiah;

  // Auto-refresh stok setiap 30 detik
  useEffect(() => {
    const refreshStok = async () => {
      try {
        setIsRefreshing(true);
        const response = await fetch(`/api/products/${product.id}/stock`);
        const data = await response.json();

        if (data.stok !== currentStok) {
          setCurrentStok(data.stok);
          setStokChanged(true);
          setTimeout(() => setStokChanged(false), 2000);
        }

        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error refreshing stock:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Refresh immediately on mount
    refreshStok();

    // Then refresh every 30 seconds
    const interval = setInterval(refreshStok, 30000);

    return () => clearInterval(interval);
  }, [product.id, currentStok]);

  // Manual refresh handler
  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(`/api/products/${product.id}/stock`);
      const data = await response.json();

      if (data.stok !== currentStok) {
        setCurrentStok(data.stok);
        setStokChanged(true);
        setTimeout(() => setStokChanged(false), 2000);
      }

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing stock:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleWhatsAppOrder = () => {
    if (product.stok > 0) {
      const message = formatWhatsAppMessage(product, quantity);
      openWhatsApp(message);
    }
  };

  const handleShopeeOrder = () => {
    if (product.shopee_link) {
      openShopee(product.shopee_link);
    }
  };

  const handleQuickShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const productUrl = window.location.href;
    const text = `Lihat produk ${product.nama} - ${formatPrice(product.harga)}`;

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(productUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + productUrl)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      <Head title={`${product.name} - Damar Kurung Gresik`} />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <PublicNavbar activeMenu="/products" />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-amber-600">Beranda</Link>
              <span className="text-gray-400">/</span>
              <Link href="/products" className="text-gray-500 hover:text-amber-600">Produk</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Admin Edit Button */}
          {auth?.user?.role === 'admin' && (
            <div className="flex justify-end mb-6">
              <Link
                href={`/products/${product.id}/edit`}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Produk
              </Link>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Images */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="w-full h-full bg-gray-200" />
                </div>
              </motion.div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-amber-500' : ''
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {product.category && (
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {product.category.nama}
                </div>
              )}

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.nama}</h1>

              {/* Rating Display */}
              {product.average_rating !== undefined && product.review_count !== undefined && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={product.average_rating} readonly size="md" />
                    <span className="text-lg font-bold text-gray-900">{product.average_rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">
                    ({product.review_count} {product.review_count === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl mb-6">
                <div className="text-4xl font-bold text-amber-600">
                  {formatPrice(product.harga)}
                </div>
              </div>

              {/* Description */}
              {product.deskripsi && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.deskripsi}
                </p>
              )}

              {/* Stock & SKU */}
              <div className="flex gap-6 mb-6">
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Stok:</span>
                        <motion.span
                          animate={stokChanged ? {
                            scale: [1, 1.2, 1],
                            color: ['#10b981', '#f59e0b', '#10b981']
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className={`font-bold text-lg ${currentStok > 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {currentStok > 0 ? `${currentStok} tersedia` : 'Habis'}
                        </motion.span>
                        {stokChanged && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full font-medium"
                          >
                            Updated!
                          </motion.span>
                        )}
                      </div>
                      <button
                        onClick={handleManualRefresh}
                        disabled={isRefreshing}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Refresh stok"
                      >
                        <RefreshCw
                          className={`w-4 h-4 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Diupdate: {lastUpdated.toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </span>
                      <span className="mx-1">•</span>
                      <span className="text-blue-600 font-medium">Auto-refresh setiap 30 detik</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 font-semibold text-gray-900">{product.sku}</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              {currentStok > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(currentStok, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center border border-gray-300 rounded-lg py-2 font-semibold"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(currentStok, quantity + 1))}
                      disabled={quantity >= currentStok}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-600">
                      Total: <span className="font-bold text-amber-600">{formatPrice(product.harga * quantity)}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={currentStok === 0}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {currentStok > 0 ? '🚀 Pesan Sekarang via WhatsApp' : 'Stok Habis'}
                </button>

                {product.shopee_link && (
                  <button
                    onClick={handleShopeeOrder}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.03 11.42L7 11.38c-.03-.14-.03-.27-.03-.41a4.34 4.34 0 014.34-4.34h.02c.42 0 .82.08 1.2.22l-.46-.46a.75.75 0 111.06-1.06l1.77 1.77a.75.75 0 010 1.06L13.13 10a.75.75 0 01-1.06-1.06l.46-.46a2.84 2.84 0 00-1.2-.22h-.02A2.84 2.84 0 008.47 11c0 .14 0 .27.03.41l.04.04z"/>
                    </svg>
                    🛒 Beli di Shopee
                  </button>
                )}
              </div>

              {/* Contact Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">Butuh Bantuan?</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Hubungi kami melalui WhatsApp untuk konsultasi produk, custom order, atau pertanyaan lainnya.
                    </p>
                    <a
                      href={`https://wa.me/${WHATSAPP_BUSINESS.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {WHATSAPP_BUSINESS.displayNumber} →
                    </a>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-semibold">Bagikan:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickShare('facebook')}
                      className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                      title="Bagikan ke Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleQuickShare('twitter')}
                      className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
                      title="Bagikan ke Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleQuickShare('whatsapp')}
                      className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                      title="Bagikan ke WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description Tab */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Deskripsi Produk</h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              {product.deskripsi && product.deskripsi.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ulasan Pelanggan</h2>
                {reviews.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RatingStars rating={product.average_rating || 0} readonly size="md" />
                      <span className="text-xl font-bold text-gray-900">
                        {product.average_rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      dari {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                )}
              </div>

              {auth?.user && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Tulis Ulasan
                </button>
              )}
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-900">{review.user.name}</span>
                          <RatingStars rating={review.rating} readonly size="sm" />
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">{review.komentar}</p>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {review.images.map((image) => (
                          <div key={image.id} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={`/storage/${image.gambar}`}
                              alt="Review"
                              className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Belum ada ulasan untuk produk ini</p>
                {auth?.user && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
                  >
                    Jadilah yang pertama memberi ulasan
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Komentar</h2>
                <p className="text-gray-600">
                  {comments.length > 0
                    ? `${comments.length} ${comments.length === 1 ? 'komentar' : 'komentar'}`
                    : 'Belum ada komentar'
                  }
                </p>
              </div>

              {auth?.user && (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Tulis Komentar
                </button>
              )}
            </div>

            <CommentList
              comments={comments}
              currentUserId={auth?.user?.id}
            />
          </div>

          {/* Related Products - Coming Soon */}
          <div className="text-center py-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Produk Lainnya</h2>
            <p className="text-gray-600">
              Jelajahi koleksi produk kami yang lain di{' '}
              <Link href="/products" className="text-amber-600 hover:text-amber-700 font-semibold">
                halaman produk
              </Link>
            </p>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && auth?.user && (
          <ReviewForm
            productId={product.id}
            onClose={() => setShowReviewForm(false)}
          />
        )}

        {/* Comment Form Modal */}
        {showCommentForm && auth?.user && (
          <CommentForm
            targetId={product.id}
            targetType="product"
            onClose={() => setShowCommentForm(false)}
          />
        )}
      </div>
    </>
  );
}
