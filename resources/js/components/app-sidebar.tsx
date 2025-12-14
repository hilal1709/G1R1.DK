import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    FileText,
    Calendar,
    ShoppingBag,
    Gamepad2,
    Users,
    MessageSquare,
    Info
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Artikel',
        href: '/articles',
        icon: FileText,
    },
    {
        title: 'Event',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'Produk',
        href: '/products',
        icon: ShoppingBag,
    },
    {
        title: 'Games',
        href: '/games',
        icon: Gamepad2,
    },
    {
        title: 'Tentang Kami',
        href: '/about',
        icon: Info,
    },
    {
        title: 'Kontak',
        href: '/contact',
        icon: MessageSquare,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Keranjang',
        href: '/cart',
        icon: ShoppingBag,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
