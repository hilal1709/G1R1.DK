import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface Event {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image: string;
  location: string;
  start_date: string;
  end_date: string;
  max_participants: number | null;
  registered_participants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  is_featured: boolean;
}

interface Props {
  events: {
    data: Event[];
    links: any;
    meta: any;
  };
  filters: {
    search?: string;
    status?: string;
  };
}

export default function EventsIndex({ events, filters }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [status, setStatus] = useState(filters.status || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/events', { search, status }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  return (
    <>
      <Head title="Event UMKM - Damar Kurung Gresik" />

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
                <Link href="/events" className="text-amber-600 font-semibold">Event</Link>
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
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari event..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
          {events.data.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.data.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/events/${event.slug}`}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group h-full flex flex-col">
                        {/* Image */}
                        <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden relative">
                          <div className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 right-4">
                            {getStatusBadge(event.status)}
                          </div>
                          {event.is_featured && (
                            <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                            {event.short_description}
                          </p>

                          {/* Date */}
                          <div className="flex items-start text-gray-600 mb-2">
                            <svg className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="text-sm">
                              <div>{formatDate(event.start_date)}</div>
                              {event.start_date !== event.end_date && (
                                <div className="text-gray-500">s/d {formatDate(event.end_date)}</div>
                              )}
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-start text-gray-600 mb-4">
                            <svg className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{event.location}</span>
                          </div>

                          {/* Participants */}
                          {event.max_participants && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Peserta</span>
                                <span className="font-bold text-amber-600">
                                  {event.registered_participants} / {event.max_participants}
                                </span>
                              </div>
                              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(100, (event.registered_participants / event.max_participants) * 100)}%`
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
              {events.meta.last_page > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex gap-2">
                    {events.links.map((link: any, index: number) => (
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
