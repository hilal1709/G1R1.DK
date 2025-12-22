// Business Contact Information
export const WHATSAPP_BUSINESS = {
  number: '6281234567890', // Ganti dengan nomor WhatsApp Business Anda
  displayNumber: '+62 812-3456-7890',
};

export const BUSINESS_INFO = {
  name: 'Damar Kurung Gresik',
  address: 'Gresik, Jawa Timur',
  email: 'info@damarkurung.com',
};

// WhatsApp Message Templates
export const formatWhatsAppMessage = (product: {
  nama: string;
  harga: number;
  category?: { nama: string };
}, quantity: number = 1) => {
  const total = product.harga * quantity;

  return `🌟 *PESANAN DAMAR KURUNG* 🌟

📦 *Produk:* ${product.nama}
${product.category ? `🏷️ *Kategori:* ${product.category.nama}` : ''}
💰 *Harga:* ${formatRupiah(product.harga)}
📊 *Jumlah:* ${quantity} pcs
💵 *Total:* ${formatRupiah(total)}

Apakah produk ini masih tersedia? Saya ingin memesan. Terima kasih! 🙏`;
};

// Quick Order Message (for direct buy from list)
export const formatQuickOrderMessage = (product: {
  nama: string;
  harga: number;
}) => {
  return `Halo! Saya tertarik dengan produk *${product.nama}* seharga ${formatRupiah(product.harga)}. Apakah masih tersedia?`;
};

// Format Rupiah
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Generate WhatsApp URL
export const generateWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_BUSINESS.number}?text=${encodeURIComponent(message)}`;
};

// Open WhatsApp
export const openWhatsApp = (message: string): void => {
  window.open(generateWhatsAppUrl(message), '_blank');
};

// Open Shopee
export const openShopee = (link: string): void => {
  window.open(link, '_blank');
};
