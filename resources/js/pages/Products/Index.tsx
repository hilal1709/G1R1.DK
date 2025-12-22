import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import { ShoppingCart, Search, Filter, ChevronDown, MessageCircle, ShoppingBag } from 'lucide-react';
import { formatQuickOrderMessage, openWhatsApp, openShopee, formatRupiah } from '@/lib/constants';

interface ProductImage {
  id: number;
  path: string;
}

interface Category {
  id: number;
  nama: string;
}

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  shopee_link?: string | null;
  category?: Category;
  images?: ProductImage[];
}

interface Props {
  products?: any; // Laravel pagination object
  categories?: Category[];
  filters?: {
    search?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
  };
  auth?: {
    user?: {
      name: string;
      email: string;
      role: string;
    };
  };
}

export default function ProductsIndex({ products, filters, categories, auth }: Props) {
  console.log('Received props:', { products, filters, categories, auth });

  // Laravel pagination structure: { data: [], links: [], current_page, last_page, etc. }
  const safeProducts = {
    data: Array.isArray(products?.data) ? products.data : [],
    current_page: products?.current_page ?? 1,
    last_page: products?.last_page ?? 1,
    per_page: products?.per_page ?? 12,
    total: products?.total ?? 0,
    links: Array.isArray(products?.links) ? products.links : []
  };
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeFilters = typeof filters === 'object' && filters !== null && !Array.isArray(filters) ? filters : {};

  console.log('Safe data:', { safeProducts, safeCategories, safeFilters });

  const [searchQuery, setSearchQuery] = useState(safeFilters.search ?? '');
  const [selectedCategory, setSelectedCategory] = useState(safeFilters.category ?? '');
  const [minPrice, setMinPrice] = useState(safeFilters.min_price ?? '');
  const [maxPrice, setMaxPrice] = useState(safeFilters.max_price ?? '');
  const [sortBy, setSortBy] = useState(safeFilters.sort ?? 'latest');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = () => {
    router.get('/products', {
      search: searchQuery,
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
    setSearchQuery('');
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

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      return `/storage/${product.images[0].path}`;
    }
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f97316'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23ffffff'%3ENo Image%3C/text%3E%3C/svg%3E`;
  };

  return (
    <>
      <Head title="Katalog Produk - Damar Kurung Gresik" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <PublicNavbar activeMenu="/products" />

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                    placeholder="Nama produk..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Semua Kategori</option>
                    {safeCategories.map((cat) => (
                      <option key={cat.id} value={cat.nama}>{cat.nama}</option>
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
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  >
                    <option value="latest">Terbaru</option>
                    <option value="price_low">Harga: Rendah ke Tinggi</option>
                    <option value="price_high">Harga: Tinggi ke Rendah</option>
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
              {/* Results Info and Add Button */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Menampilkan {safeProducts.data.length} dari {safeProducts.total} produk
                </p>
                {auth?.user?.role === 'admin' && (
                  <Link
                    href="/products/create"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Produk
                  </Link>
                )}
              </div>

              {/* Products */}
              {safeProducts.data && safeProducts.data.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {safeProducts.data.map((product: Product, index: number) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group relative">
                          {/* Admin Edit Button */}
                          {auth?.user?.role === 'admin' && (
                            <Link
                              href={`/products/${product.id}/edit`}
                              className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-amber-500 text-gray-700 hover:text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                          )}

                          <Link href={`/products/${product.id}`}>
                            {/* Image */}
                            <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden relative">
                              <img
                                src={getProductImage(product)}
                                alt={product.nama}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f97316'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23ffffff'%3ENo Image%3C/text%3E%3C/svg%3E`;
                                }}
                              />
                              {product.stok <= 5 && product.stok > 0 && (
                                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  Stok Terbatas
                                </div>
                              )}
                              {product.stok === 0 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <span className="text-white font-bold text-xl">Stok Habis</span>
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                              {product.category && (
                                <div className="text-xs text-amber-600 font-semibold mb-2">{product.category.nama}</div>
                              )}
                              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                {product.nama}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.deskripsi}
                              </p>

                              {/* Price */}
                              <div className="mb-3">
                                <div className="text-xl font-bold text-amber-600">
                                  {formatPrice(product.harga)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Stok: {product.stok}
                                </div>
                              </div>

                              {/* Quick Order Buttons */}
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (product.stok > 0) {
                                      openWhatsApp(formatQuickOrderMessage(product));
                                    }
                                  }}
                                  disabled={product.stok === 0}
                                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all"
                                  title="Pesan via WhatsApp"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span className="hidden sm:inline">WA</span>
                                </button>
                                {product.shopee_link && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      openShopee(product.shopee_link!);
                                    }}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all"
                                    title="Beli di Shopee"
                                  >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span className="hidden sm:inline">Shopee</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {safeProducts.last_page > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex gap-2">
                        {safeProducts.links.map((link, index: number) => (
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
