import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/PublicNavbar';
import { Edit, Trash2, Plus } from 'lucide-react';

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
}

interface Props {
  events: {
    data: Event[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
  filters: {
    search?: string;
    status?: string;
  };
}

export default function EventsIndex({ events, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || '');
  const { auth } = usePage().props as any;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/events', { search, status }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (id: number, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus event "${nama}"?`)) {
      router.delete(`/events/${id}`, {
        preserveScroll: true,
      });
    }
  };

  const formatDate = (date: string) => {
  return date.replace('T', ' ').slice(0, 16) + ' WIB';
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
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-semibold`}>
        {badge.label}
      </span>
    );
  };

  const excerpt = (text: string, words = 20) =>
  text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, words)
    .join(' ') + '...';

  return (
    <>
      <Head title="Event UMKM - Damar Kurung Gresik" />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <PublicNavbar activeMenu="/events" />

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Event & Workshop
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90"
            >
              Ikuti berbagai kegiatan menarik seputar Damar Kurung
            </motion.p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Cari Event</h2>
              <Link
                href="/events/create"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Buat Event Baru
              </Link>
            </div>
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari event..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
              >
                <option value="">Semua Status</option>
                <option value="upcoming">Mendatang</option>
                <option value="ongoing">Berlangsung</option>
                <option value="completed">Selesai</option>
              </select>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Cari
              </button>
            </form>
          </div>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {events?.data && events.data.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.data.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Admin Action Buttons */}
                    {auth?.user && (
                      <div className="absolute top-2 right-2 z-10 flex gap-2">
                        <Link
                          href={`/events/${event.id}/edit`}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(event.id, event.nama);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <Link href={`/events/${event.id}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group h-full flex flex-col">
                        {/* Image */}
                        <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden relative">
                          {event.event_medias?.length ? (
                          <img
                            src={event.event_medias[0].file_path}
                            alt={event.nama}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            {getStatusBadge(event.status)}
                          </div>
            
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {event.nama}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                            {excerpt(event.deskripsi, 20)}
                          </p>

                          {/* Date */}
                          <div className="flex items-start text-gray-600 mb-2">
                            <svg className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="text-sm">
                              <div>{formatDate(event.tanggal_mulai)}</div>
                              {event.tanggal_selesai && event.tanggal_mulai !== event.tanggal_selesai  && (
                                <div className="text-gray-500">s/d {formatDate(event.tanggal_selesai)}</div>
                              )}
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-start text-gray-600 mb-4">
                            <svg className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{event.lokasi}</span>
                          </div>

                          {/* Participants */}
                          {event.max_pendaftar && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Peserta</span>
                                <span className="font-bold text-amber-600">
                                  {event.registered_participants} / {event.max_pendaftar}
                                </span>
                              </div>
                              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(100, (event.registered_participants / event.max_pendaftar) * 100)}%`
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {events?.meta?.last_page && events.meta.last_page > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex gap-2">
                    {events.links.map((link, index: number) => (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Event Tidak Ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba ubah kriteria pencarian Anda</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
