import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface PublicNavbarProps {
    activeMenu?: string;
}

export default function PublicNavbar({ activeMenu = '' }: PublicNavbarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const homeRoute = user
    ? user.role === 'admin'
        ? '/dashboard'       // tambahkan slash di depan
        : '/user-dashboard'  // juga tambahkan slash
    : '/';
    const menuItems = [
        { href: homeRoute, label: 'Beranda' },
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
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src="/images/giri-dk-logo-o.PNG"
                                alt="Damar Kurung Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Damar Kurung
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6">
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

                        {!user && (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}

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

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-gray-100 focus:outline-none"
                    >
                        {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-gray-200 py-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-2 rounded-md ${
                                    activeMenu === item.href
                                        ? 'bg-amber-50 text-amber-600 font-semibold'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-amber-600'
                                }`}
                                onClick={() => setShowMobileMenu(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {!user && (
                            <div className="px-4 py-2 border-t border-gray-200 mt-2 flex flex-col space-y-2">
                                <Link
                                    href="/login"
                                    className="w-full text-center px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-colors"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}

                        {user && (
                            <>
                                <div className="px-4 py-2 border-t border-gray-200 mt-2">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full mt-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center justify-center space-x-2"
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
        </nav>
    );
}
