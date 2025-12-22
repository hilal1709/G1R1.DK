import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentFormProps {
  targetId: number;
  targetType: 'article' | 'event' | 'video' | 'product';
  onClose?: () => void;
  inline?: boolean; // true = tampil inline, false = modal
}

export default function CommentForm({ targetId, targetType, onClose, inline = false }: CommentFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    komentar: '',
    article_id: targetType === 'article' ? targetId : null,
    event_id: targetType === 'event' ? targetId : null,
    video_id: targetType === 'video' ? targetId : null,
    product_id: targetType === 'product' ? targetId : null,
  });

  const [wordCount, setWordCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const MIN_WORDS = 100;
  const MAX_CHARS = 2000;

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const handleKomentarChange = (value: string) => {
    setData('komentar', value);
    setWordCount(countWords(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (wordCount < MIN_WORDS) {
      return;
    }

    post(route('comments.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setShowSuccess(true);
        reset('komentar');
        setWordCount(0);

        setTimeout(() => {
          setShowSuccess(false);
          if (onClose) onClose();
        }, 2000);
      },
    });
  };

  const isValid = wordCount >= MIN_WORDS && data.komentar.length <= MAX_CHARS;

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
        >
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-800 font-medium">Komentar berhasil dikirim!</p>
        </motion.div>
      )}

      <div>
        <label htmlFor="komentar" className="block text-sm font-semibold text-gray-700 mb-2">
          Komentar Anda <span className="text-red-500">*</span>
        </label>
        <textarea
          id="komentar"
          value={data.komentar}
          onChange={(e) => handleKomentarChange(e.target.value)}
          rows={8}
          maxLength={MAX_CHARS}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${
            wordCount > 0 && wordCount < MIN_WORDS
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder={`Tulis komentar Anda di sini... (minimal ${MIN_WORDS} kata)`}
        />

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium ${
                wordCount < MIN_WORDS
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {wordCount} / {MIN_WORDS} kata
              {wordCount < MIN_WORDS && (
                <span className="text-xs ml-1">
                  (kurang {MIN_WORDS - wordCount} kata)
                </span>
              )}
            </span>
            <span className="text-sm text-gray-500">
              {data.komentar.length} / {MAX_CHARS} karakter
            </span>
          </div>
        </div>

        {errors.komentar && (
          <p className="text-red-500 text-sm mt-1">{errors.komentar}</p>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Tips menulis komentar yang baik:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Minimal {MIN_WORDS} kata untuk memberikan konteks yang cukup</li>
              <li>Berikan pendapat yang konstruktif dan sopan</li>
              <li>Hindari kata-kata kasar atau menyinggung</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={processing || !isValid}
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          {processing ? 'Mengirim...' : 'Kirim Komentar'}
        </button>
      </div>
    </form>
  );

  // Inline mode (tampil langsung di halaman)
  if (inline) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-amber-600" />
          Tulis Komentar
        </h3>
        <FormContent />
      </div>
    );
  }

  // Modal mode
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
        className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-7 h-7 text-amber-600" />
            Tulis Komentar
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <FormContent />
      </motion.div>
    </motion.div>
  );
}
