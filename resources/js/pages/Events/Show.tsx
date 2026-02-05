import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import { usePage } from '@inertiajs/react';
import BatikPattern from '@/components/BatikPattern';
import TraditionalHeader from '@/components/TraditionalHeader';


interface Event {
  id: number;
  nama: string;
  deskripsi: string;
  lokasi: string;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  max_pendaftar: number | null;
  registered_participants: number;
  event_medias?: {
    id: number;
    file_path: string;
  }[];
  comments?: Comment[];
}

interface RelatedEvent {
  id: number;
  nama: string;
  tanggal_mulai: string;
  lokasi: string;
  event_medias?: {
    id: number;
    file_path: string;
  }[];
}

interface Props {
  event: Event;
  relatedEvents: RelatedEvent[];
  isRegistered: boolean;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  komentar: string;
  created_at: string;
  user_id: number;
  user: User;
}

export default function EventShow({ event, relatedEvents, isRegistered }: Props) {
  const [isRegistering, setIsRegistering] = useState(false);

  const formatDate = (date: string) => {
  return date.replace('T', ' ').slice(0, 16) + ' WIB';
};


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Mendatang' },
      ongoing: { bg: 'bg-green-100', text: 'text-green-800', label: 'Berlangsung' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Selesai' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dibatalkan' },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <span className={`${badge.bg} ${badge.text} px-4 py-2 rounded-full text-sm font-semibold`}>
        {badge.label}
      </span>
    );
  };

  const [isRegisteredState, setIsRegisteredState] = useState(isRegistered);

  const handleCancelRegistration = () => {
    if (!confirm('Apakah Anda yakin ingin membatalkan pendaftaran?')) return;

    setIsRegistering(true);

    router.delete(`/events/${event.id}/registration`, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Pendaftaran dibatalkan.');
        setIsRegistering(false);
        setIsRegisteredState(false);
        router.reload({ only: ['event', 'isRegistered'] });
      },
      onError: (errors) => {
        const errorMessage = errors?.message || 'Gagal membatalkan pendaftaran.';
        alert(errorMessage);
        setIsRegistering(false);
      },
    });
  };


  const handleRegister = () => {
    if (isRegistered) {
      alert('Anda sudah terdaftar di event ini!');
      return;
    }

    if (event.max_pendaftar &&  event.registered_participants >=  event.max_pendaftar) {
      alert('Maaf, kuota peserta sudah penuh!');
      return;
    }

    setIsRegistering(true);
    router.post(
    `/events/${event.id}/registration`,
    {}, {
      preserveScroll: true,
      onSuccess: (page) => {
        alert('Pendaftaran berhasil!');
        setIsRegistering(false);
        setIsRegisteredState(true);
        // Reload halaman untuk update data terbaru
        router.reload({ only: ['event', 'isRegistered'] });
      },
      onError: (errors) => {
        const errorMessage = errors?.message || 'Pendaftaran gagal. Silakan coba lagi.';
        alert(errorMessage);
        setIsRegistering(false);
      },
    });
  };

  const { auth } = usePage().props as any;
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${event.nama} - Damar Kurung Gresik`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  const isFull = event.max_pendaftar &&  event.registered_participants >= event.max_pendaftar;
  const canRegister = event.status === 'upcoming' && !isFull && !isRegisteredState;


    const excerpt = (text: string, words = 20) =>
    text
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, words)
      .join(' ') + '...';

  return (
    <>
      <Head title={`${event.nama} - Damar Kurung Gresik`} />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <PublicNavbar activeMenu="/events" />

        {/* Batik Pattern Overlay */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <BatikPattern className="w-full h-full text-amber-900 opacity-[0.03]" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-amber-600">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/events" className="hover:text-amber-600">Event</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{event.nama}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-8 aspect-video relative"
              >
                {event.event_medias?.length ? (
                          <img
                            src={event.event_medias[0].file_path}
                            alt={event.nama}
                            className="w-full h-full object-contain"
                          />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-6 right-6">
                  {getStatusBadge(event.status)}
                </div>

              </motion.div>

              {/* Event Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.nama}</h1>
                <p className="text-xl text-gray-600">{excerpt(event.deskripsi, 20)}</p>
              </motion.div>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Tanggal & Waktu</h3>
                      <p className="text-gray-600 text-sm">{formatDate(event.tanggal_mulai)}</p>
                      {event.tanggal_selesai && event.tanggal_mulai !== event.tanggal_selesai && (
                        <p className="text-gray-500 text-sm">s/d {formatDate(event.tanggal_selesai)}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Lokasi</h3>
                      <p className="text-gray-600 text-sm">{event.lokasi}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tentang Event</h2>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {event.deskripsi}
                </div>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Komentar
                </h2>

                {/* List Komentar */}
                {event.comments && event.comments.length > 0 ? (
                  <div className="space-y-4">
                    {event.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b pb-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-amber-700">
                              {comment.user.name}
                            </p>

                            {editingId === comment.id ? (
                              <textarea
                                className="w-full mt-2 border text-gray-900 rounded-lg p-2"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                              />
                            ) : (
                              <p className="text-gray-700 mt-1">
                                {comment.komentar}
                              </p>
                            )}

                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(comment.created_at).toLocaleString('id-ID')}
                            </p>
                          </div>

                          {/* Action */}
                          {auth?.user?.id === comment.user_id && (
                            <div className="flex gap-2 text-sm">
                              {editingId === comment.id ? (
                                <>
                                  <button
                                    onClick={() => {
                                      router.put(`/comments/${comment.id}`, {
                                        komentar: editValue,
                                      }, {
                                        onSuccess: () => {
                                          setEditingId(null);
                                          setEditValue('');
                                          router.reload({ only: ['event'] });
                                        },
                                      });
                                    }}
                                    className="text-green-600 hover:underline"
                                  >
                                    Simpan
                                  </button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="text-gray-500 hover:underline"
                                  >
                                    Batal
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingId(comment.id);
                                      setEditValue(comment.komentar);
                                    }}
                                    className="text-blue-600 hover:underline"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (!confirm('Hapus komentar ini?')) return;
                                      router.delete(`/comments/${comment.id}`, {
                                        onSuccess: () => router.reload({ only: ['event'] }),
                                      });
                                    }}
                                    className="text-red-600 hover:underline"
                                  >
                                    Hapus
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Belum ada komentar.</p>
                )}

                {/* Form Tambah Komentar */}
                {auth?.user && (
                  <div className="mt-6">
                    <textarea
                      className="w-full border text-gray-900 rounded-xl p-3 focus:ring focus:ring-amber-300"
                      rows={3}
                      placeholder="Tulis komentar..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />

                    <button
                      onClick={() => {
                        router.post('/comments', {
                          event_id: event.id,
                          komentar: newComment,
                        }, {
                          onSuccess: () => {
                            setNewComment('');
                            router.reload({ only: ['event'] });
                          },
                        });
                      }}
                      className="mt-3 px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700"
                    >
                      Kirim Komentar
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bagikan Event</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Registration Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg sticky top-24 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pendaftaran</h2>

                {/* Participants */}
                {event.max_pendaftar && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Peserta Terdaftar</span>
                      <span className="font-bold text-amber-600">
                        {event.registered_participants } / {event.max_pendaftar}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-3 rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (event.registered_participants / event.max_pendaftar) * 100)}%`
                        }}
                      />
                    </div>
                    {isFull && (
                      <p className="text-red-600 text-sm mt-2 font-semibold">Kuota Penuh!</p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isRegisteredState ? (
                    <button
                      onClick={handleCancelRegistration}
                      disabled={isRegistering}
                      className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRegistering ? 'Membatalkan...' : 'Batalkan Pendaftaran'}
                    </button>
                  ) : canRegister ? (
                    <button
                      onClick={handleRegister}
                      disabled={isRegistering}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRegistering ? 'Mendaftar...' : 'Daftar Sekarang'}
                    </button>

                  ) : isFull ? (
                    <div className="bg-red-100 text-red-800 py-4 rounded-xl font-bold text-center">
                      Kuota Penuh
                    </div>
                  ) : event.status === 'completed' ? (
                    <div className="bg-gray-100 text-gray-800 py-4 rounded-xl font-bold text-center">
                      Event Telah Selesai
                    </div>
                  ) : (
                    <div className="bg-gray-100 text-gray-800 py-4 rounded-xl font-bold text-center">
                      Pendaftaran Ditutup
                    </div>
                  )}
                </div>

              </motion.div>

              {/* Related Events */}
              {relatedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Event Lainnya</h2>
                  <div className="space-y-4">
                    {relatedEvents.map((relatedEvent) => (
                      <Link
                        key={relatedEvent.id}
                        href={`/events/${relatedEvent.id}`}
                        className="flex gap-4 group"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg overflow-hidden flex-shrink-0">
                          {relatedEvent.event_medias?.length ? (
                            <img
                              src={relatedEvent.event_medias[0].file_path}
                              alt={relatedEvent.nama}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-1">
                            {relatedEvent.nama}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(relatedEvent.tanggal_mulai).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
