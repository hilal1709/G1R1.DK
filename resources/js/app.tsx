import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Ziggy } from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Make route helper globally available
declare global {
    function route(name: string, params?: any, absolute?: boolean): string;
}

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.route = (name: string, params?: any, absolute?: boolean) => {
        const routes = Ziggy.routes;
        const route = routes[name];

        if (!route) {
            console.error(`Route ${name} not found`);
            return '#';
        }

        let url = route.uri;

        // Replace parameters in URL
        if (params) {
            Object.keys(params).forEach(key => {
                url = url.replace(`{${key}}`, params[key]);
            });
        }

        // Remove optional parameter placeholders
        url = url.replace(/\{[^}]*\?\}/g, '');

        const baseUrl = absolute ? Ziggy.url : '';
        return `${baseUrl}/${url}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    };
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
