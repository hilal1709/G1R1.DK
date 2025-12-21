import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    discount_price: number | null;
    final_price: number;
    stock: number;
  };
}

interface Props {
  cartItems: CartItem[];
}

export default function Cart({ cartItems }: Props) {
  const [processingId, setProcessingId] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setProcessingId(itemId);
    router.put(`/cart/${itemId}`, { quantity: newQuantity }, {
      preserveScroll: true,
      onFinish: () => setProcessingId(null),
    });
  };

  const removeItem = (itemId: number) => {
    if (!confirm('Hapus produk dari keranjang?')) return;

    setProcessingId(itemId);
    router.delete(`/cart/${itemId}`, {
      preserveScroll: true,
      onFinish: () => setProcessingId(null),
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.final_price * item.quantity);
    }, 0);
  };

  const handleCheckoutWhatsApp = () => {
    const items = cartItems.map(item =>
      `• ${item.product.name} (${item.quantity}x) = ${formatPrice(item.product.final_price * item.quantity)}`
    ).join('\n');

    const total = formatPrice(calculateSubtotal());
    const message = `Halo, saya ingin memesan:\n\n${items}\n\nTotal: ${total}\n\nMohon informasi untuk proses pemesanan. Terima kasih!`;

    const whatsappNumber = '6281234567890';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 15000 : 0; // Flat shipping fee
  const total = subtotal + shipping;

  return (
    <>
      <Head title="Keranjang Belanja - Damar Kurung Gresik" />

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
                <Link href="/login" className="text-gray-700 hover:text-amber-600">Masuk</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Keranjang</span>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
            <p className="text-gray-600">
              {cartItems.length > 0
                ? `${cartItems.length} produk dalam keranjang`
                : 'Keranjang Anda kosong'}
            </p>
          </motion.div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 shadow-md"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link href={`/products/${item.product.slug}`}>
                        <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl overflow-hidden flex-shrink-0 hover:opacity-75 transition-opacity">
                          <div className="w-full h-full bg-gray-200" />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-amber-600">
                            {formatPrice(item.product.final_price)}
                          </span>
                          {item.product.discount_price && (
                            <span className="text-lg text-gray-400 line-through">
                              {formatPrice(item.product.price)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={processingId === item.id || item.quantity <= 1}
                              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>

                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val > 0 && val <= item.product.stock) {
                                  updateQuantity(item.id, val);
                                }
                              }}
                              disabled={processingId === item.id}
                              className="w-16 text-center border border-gray-300 rounded-lg py-2 font-semibold disabled:opacity-50"
                              min="1"
                              max={item.product.stock}
                            />

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={processingId === item.id || item.quantity >= item.product.stock}
                              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          <span className="text-gray-500 text-sm">
                            Stok: {item.product.stock}
                          </span>

                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={processingId === item.id}
                            className="ml-auto text-red-600 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
                          >
                            Hapus
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-xl font-bold text-gray-900">
                              {formatPrice(item.product.final_price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} produk)</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkir</span>
                      <span className="font-semibold">{formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                    <span>Total</span>
                    <span className="text-amber-600">{formatPrice(total)}</span>
                  </div>

                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all mb-3"
                  >
                    Checkout via WhatsApp
                  </button>

                  <Link
                    href="/products"
                    className="block w-full text-center border-2 border-amber-500 text-amber-600 py-4 rounded-xl font-bold hover:bg-amber-50 transition-colors"
                  >
                    Lanjut Belanja
                  </Link>

                  {/* Info Box */}
                  <div className="mt-6 bg-blue-50 rounded-xl p-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-blue-800">
                        Pesanan akan diproses setelah konfirmasi melalui WhatsApp dan pembayaran diterima.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-16 text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Kosong</h2>
              <p className="text-gray-600 mb-8">Belum ada produk dalam keranjang Anda</p>
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                Mulai Belanja
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
