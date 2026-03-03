import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PublicNavbarProps {
    activeMenu?: string;
}

export default function PublicNavbar({ activeMenu = '' }: PublicNavbarProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const homeRoute = user
        ? user.role === 'admin'
            ? '/dashboard'
            : '/user-dashboard'
        : '/';

    const menuItems = [
        { href: homeRoute, label: 'Beranda' },
        { href: '/articles', label: 'Artikel' },
        { href: '/products', label: 'Produk' },
        { href: '/events', label: 'Event' },
        ...(user ? [{ href: '/games', label: 'Games' }] : []),
        { href: '/about', label: 'Tentang' },
        { href: '/contact', label: 'Kontak' },
    ];

    // Entry animation on mount
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 });
        if (logoRef.current) {
            tl.fromTo(logoRef.current, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '-=0.4');
        }
        if (menuItemsRef.current) {
            const items = menuItemsRef.current.querySelectorAll('.nav-item');
            tl.fromTo(items, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 }, '-=0.3');
        }
        if (actionsRef.current) {
            tl.fromTo(actionsRef.current, { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, '-=0.35');
        }
    }, []);

    // Animate mobile menu items with GSAP
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (showMobileMenu) {
            gsap.fromTo(mobileMenuRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' });
            const items = mobileMenuRef.current.querySelectorAll('.mobile-item');
            gsap.fromTo(items, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, stagger: 0.055, delay: 0.06, ease: 'power2.out' });
        }
    }, [showMobileMenu]);

    // Scroll detect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 70);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => { router.post('/logout'); };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-amber-100' : 'bg-white shadow-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div ref={logoRef}>
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all duration-200">
                                <img src="/images/giri-dk-logo-o.PNG" alt="Damar Kurung Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:flex flex-col leading-none">
                                <span className="text-base font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Damar Kurung</span>
                                <span className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">Gresik</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div ref={menuItemsRef} className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                    activeMenu === item.href
                                        ? 'text-amber-600 bg-amber-50'
                                        : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50/60'
                                }`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-amber-500 transition-transform duration-200 origin-left ${activeMenu === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div ref={actionsRef} className="hidden lg:flex items-center gap-2">
                        {!user && (
                            <>
                                <Link href="/login" className="px-4 py-2 text-sm font-semibold text-amber-600 border-2 border-amber-500 rounded-xl hover:bg-amber-50 transition-all duration-200">Masuk</Link>
                                <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-200 transition-all duration-200">Daftar</Link>
                            </>
                        )}
                        {user && (
                            <div className="relative">
                                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-amber-50 transition-all duration-200 focus:outline-none">
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center ring-2 ring-amber-200">
                                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <span className="text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl py-2 z-20 border border-gray-100">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                                            </div>
                                            {user.role === 'member' && (
                                                <Link href="/carts" className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2" onClick={() => setShowDropdown(false)}>
                                                    <ShoppingCart className="w-4 h-4 text-amber-500" /><span>Keranjang</span>
                                                </Link>
                                            )}
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                <LogOut className="w-4 h-4" /><span>Keluar</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Button */}
                    <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 focus:outline-none">
                        {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div ref={mobileMenuRef} className="lg:hidden border-t border-amber-100 bg-white/98 backdrop-blur-md shadow-lg" style={{ opacity: 0 }}>
                    <div className="px-4 py-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href}
                                className={`mobile-item flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${activeMenu === item.href ? 'bg-amber-50 text-amber-600 font-semibold' : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'}`}
                                style={{ opacity: 0 }}
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="px-4 pb-4">
                        {!user ? (
                            <div className="flex gap-2 pt-2 border-t border-gray-100 mt-1">
                                <Link href="/login" className="mobile-item flex-1 text-center py-2.5 text-sm font-semibold text-amber-600 border-2 border-amber-500 rounded-xl hover:bg-amber-50" style={{ opacity: 0 }} onClick={() => setShowMobileMenu(false)}>Masuk</Link>
                                <Link href="/register" className="mobile-item flex-1 text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl" style={{ opacity: 0 }} onClick={() => setShowMobileMenu(false)}>Daftar</Link>
                            </div>
                        ) : (
                            <div className="pt-2 border-t border-gray-100 mt-1 space-y-2">
                                <div className="mobile-item flex items-center gap-3 px-3 py-2" style={{ opacity: 0 }}>
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                                {user.role === 'member' && (
                                    <Link href="/carts" className="mobile-item flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl" style={{ opacity: 0 }} onClick={() => setShowMobileMenu(false)}>
                                        <ShoppingCart className="w-4 h-4 text-amber-500" />Keranjang
                                    </Link>
                                )}
                                <button onClick={() => { setShowMobileMenu(false); handleLogout(); }} className="mobile-item w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all" style={{ opacity: 0 }}>
                                    <LogOut className="w-4 h-4" />Keluar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
