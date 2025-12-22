import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import RatingStars from './RatingStars';

interface Props {
  productId: number;
  productName: string;
  onClose: () => void;
}

export default function ReviewForm({ productId, productName, onClose }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    product_id: productId,
    rating: 0,
    komentar: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.rating === 0) {
      alert('Mohon berikan rating bintang terlebih dahulu');
      return;
    }

    post(route('reviews.store'), {
      onSuccess: () => {
        setShowSuccess(true);
        reset();
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          window.location.reload(); // Refresh untuk melihat review baru
        }, 2000);
      },
      onError: (errors) => {
        console.error('Error submitting review:', errors);
      },
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tulis Review</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-800 font-medium">Review berhasil dikirim!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Rating <span className="text-red-500">*</span>
            </label>
            <RatingStars
              rating={data.rating}
              onRatingChange={(rating) => setData('rating', rating)}
              size="lg"
              showNumber={true}
            />
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
              Ulasan Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              required
              value={data.komentar}
              onChange={(e) => setData('komentar', e.target.value)}
              rows={6}
              maxLength={1000}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Ceritakan pengalaman Anda dengan produk ini..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {data.komentar.length} / 1000
            </div>
            {errors.komentar && (
              <p className="text-red-500 text-sm mt-1">{errors.komentar}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto Produk (Opsional, max 3)
            </label>
            <div className="space-y-4">
              {/* Preview */}
              {data.images && data.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {Array.from(data.images).map((image: File, index: number) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = Array.from(data.images || []);
                          newImages.splice(index, 1);
                          setData('images', newImages.length > 0 ? newImages : null);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {(!data.images || data.images.length < 3) && (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 mb-1">Klik untuk upload foto</p>
                    <p className="text-sm text-gray-500">JPG, PNG (max 2MB per foto)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const currentImages = Array.from(data.images || []);
                        const newFiles = Array.from(files).slice(0, 3 - currentImages.length);
                        setData('images', [...currentImages, ...newFiles]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-800">
                Review Anda akan ditampilkan setelah disetujui oleh admin. Mohon berikan ulasan yang jujur dan membantu calon pembeli lainnya.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing || !data.komentar.trim() || data.rating === 0}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Mengirim...' : 'Kirim Review'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
