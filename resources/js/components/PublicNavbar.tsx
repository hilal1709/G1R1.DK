import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PublicNavbarProps {
    activeMenu?: string;
}

export default function PublicNavbar({ activeMenu = '' }: PublicNavbarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [showDropdown, setShowDropdown] = useState(false);

    const menuItems = [
        { href: '/dashboard', label: 'Beranda' },
        { href: '/articles', label: 'Artikel' },
        { href: '/products', label: 'Produk' },
        { href: '/events', label: 'Event' },
        { href: '/games', label: 'Games' },
        { href: '/about', label: 'Tentang' },
        { href: '/contact', label: 'Kontak' },
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
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
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    activeMenu === item.href
                                        ? 'text-amber-600 font-semibold'
                                        : 'text-gray-700 hover:text-amber-600'
                                }
                            >
                                {item.label}
                            </Link>
                        ))}

                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 focus:outline-none"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden md:inline-block">{user.name}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowDropdown(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-100">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/user/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Profil
                                            </Link>
                                            <Link
                                                href="/user/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Pengaturan
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Keluar</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
