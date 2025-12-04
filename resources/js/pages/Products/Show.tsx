import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  discount_price: number | null;
  stock: number;
  sku: string;
  category: string;
  images: string[];
  shopee_link: string | null;
  rating: number;
  total_reviews: number;
  reviews: Review[];
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  images: string[];
  created_at: string;
  user: {
    name: string;
  };
}

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductShow({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const finalPrice = product.discount_price || product.price;

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk:
*${product.name}*
Kategori: ${product.category}
Harga: ${formatPrice(finalPrice)}
Jumlah: ${quantity}

Total: ${formatPrice(finalPrice * quantity)}

Apakah produk ini masih tersedia?`;

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShopeeOrder = () => {
    if (product.shopee_link) {
      window.open(product.shopee_link, '_blank');
    }
  };

  return (
    <>
      <Head title={`${product.name} - Damar Kurung Gresik`} />

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
                <Link href="/products" className="text-amber-600 font-semibold">Produk</Link>
                <Link href="/events" className="text-gray-700 hover:text-amber-600">Event</Link>
                <Link href="/login" className="text-gray-700 hover:text-amber-600">Masuk</Link>
              </div>
            </div>
          </div>
        </nav>

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
              <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.total_reviews} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl mb-6">
                {product.discount_price ? (
                  <div>
                    <div className="text-gray-400 line-through text-lg mb-1">
                      {formatPrice(product.price)}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl font-bold text-amber-600">
                        {formatPrice(product.discount_price)}
                      </div>
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-amber-600">
                    {formatPrice(product.price)}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.short_description}
              </p>

              {/* Stock & SKU */}
              <div className="flex gap-6 mb-6">
                <div>
                  <span className="text-gray-600">Stok:</span>
                  <span className={`ml-2 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">SKU:</span>
                  <span className="ml-2 font-semibold text-gray-900">{product.sku}</span>
                </div>
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
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
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-20 text-center border border-gray-300 rounded-lg py-2 font-semibold"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    router.post('/cart', { product_id: product.id, quantity }, {
                      onSuccess: () => alert('Berhasil ditambahkan ke keranjang!'),
                      onError: () => alert('Gagal menambahkan ke keranjang'),
                    });
                  }}
                  disabled={product.stock === 0}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-xl disabled:bg-gray-300 disabled:shadow-none text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  disabled={product.stock === 0}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pesan via WhatsApp
                </button>

                {product.shopee_link && (
                  <button
                    onClick={handleShopeeOrder}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.03 11.42L7 11.38c-.03-.14-.03-.27-.03-.41a4.34 4.34 0 014.34-4.34h.02c.42 0 .82.08 1.2.22l-.46-.46a.75.75 0 111.06-1.06l1.77 1.77a.75.75 0 010 1.06L13.13 10a.75.75 0 01-1.06-1.06l.46-.46a2.84 2.84 0 00-1.2-.22h-.02A2.84 2.84 0 008.47 11c0 .14 0 .27.03.41l.04.04z"/>
                    </svg>
                    Beli di Shopee
                  </button>
                )}
              </div>

              {/* Share */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-semibold">Bagikan:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600">
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
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ulasan Pembeli ({product.total_reviews})
              </h2>
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {review.user.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-gray-900">{review.user.name}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/products/${related.slug}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                      <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100">
                        <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600">
                          {related.name}
                        </h3>
                        <div className="text-lg font-bold text-amber-600">
                          {formatPrice(related.discount_price || related.price)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
