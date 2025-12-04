import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  discount_price: number | null;
  images: string[];
  category: string;
  rating: number;
  total_reviews: number;
  stock: number;
}

interface Props {
  products: {
    data: Product[];
    links: any;
    meta: any;
  };
  filters: {
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
  };
  categories: string[];
}

export default function ProductsIndex({ products, filters, categories }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [minPrice, setMinPrice] = useState(filters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
  const [sortBy, setSortBy] = useState(filters.sort || 'latest');

  const handleFilter = () => {
    router.get('/products', {
      search,
      category: selectedCategory,
      min_price: minPrice,
      max_price: maxPrice,
      sort: sortBy,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('latest');
    router.get('/products');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Head title="Katalog Produk - Damar Kurung Gresik" />

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

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Katalog Produk
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90"
            >
              Temukan Damar Kurung terbaik untuk kebutuhan Anda
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Filter Produk</h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cari Produk
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nama produk..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rentang Harga
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urutkan
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="latest">Terbaru</option>
                    <option value="price_low">Harga: Rendah ke Tinggi</option>
                    <option value="price_high">Harga: Tinggi ke Rendah</option>
                    <option value="popular">Paling Populer</option>
                    <option value="rating">Rating Tertinggi</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleFilter}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Terapkan Filter
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Menampilkan {products.data.length} dari {products.meta.total} produk
                </p>
              </div>

              {/* Products */}
              {products.data.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link href={`/products/${product.slug}`}>
                          <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group">
                            {/* Image */}
                            <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden relative">
                              <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500" />
                              {product.discount_price && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                                </div>
                              )}
                              {product.stock === 0 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <span className="text-white font-bold text-xl">Stok Habis</span>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              <div className="text-xs text-amber-600 font-semibold mb-2">{product.category}</div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.short_description}
                              </p>

                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {product.rating} ({product.total_reviews})
                                </span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between">
                                <div>
                                  {product.discount_price ? (
                                    <>
                                      <div className="text-sm text-gray-400 line-through">
                                        {formatPrice(product.price)}
                                      </div>
                                      <div className="text-xl font-bold text-amber-600">
                                        {formatPrice(product.discount_price)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-xl font-bold text-amber-600">
                                      {formatPrice(product.price)}
                                    </div>
                                  )}
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {products.meta.last_page > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex gap-2">
                        {products.links.map((link: any, index: number) => (
                          <button
                            key={index}
                            onClick={() => link.url && router.get(link.url)}
                            disabled={!link.url}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              link.active
                                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                                : link.url
                                ? 'bg-white text-gray-700 hover:bg-gray-50'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
                  <p className="text-gray-600 mb-6">Coba ubah filter pencarian Anda</p>
                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
