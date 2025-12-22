import { motion } from 'framer-motion';
import { MessageCircle, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

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

interface CommentListProps {
  comments: Comment[];
  currentUserId?: number;
}

export default function CommentList({ comments, currentUserId }: CommentListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleDelete = (commentId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      router.delete(route('comments.destroy', commentId), {
        preserveScroll: true,
      });
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.komentar);
  };

  const handleSaveEdit = (commentId: number) => {
    router.put(
      route('comments.update', commentId),
      { komentar: editText },
      {
        preserveScroll: true,
        onSuccess: () => {
          setEditingId(null);
          setEditText('');
        },
      }
    );
  };

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium">Belum ada komentar</p>
        <p className="text-gray-500 text-sm mt-1">Jadilah yang pertama berkomentar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {comment.user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{comment.user.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  <span className="mx-2">•</span>
                  {countWords(comment.komentar)} kata
                </p>
              </div>
            </div>

            {/* Action buttons - only show for comment owner */}
            {currentUserId === comment.user.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(comment)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit komentar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus komentar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {editingId === comment.id ? (
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(comment.id)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditText('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {comment.komentar}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
