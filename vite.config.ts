import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
        // Remove console.log & debugger in production
        drop: ['console', 'debugger'],
    },
    build: {
        // Increase warning threshold so we see only truly large chunks
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // React core
                    if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
                        return 'vendor-react';
                    }
                    // Inertia
                    if (id.includes('node_modules/@inertiajs')) {
                        return 'vendor-inertia';
                    }
                    // Framer Motion - split so it's only loaded when needed
                    if (id.includes('node_modules/framer-motion')) {
                        return 'vendor-framer';
                    }
                    // Radix UI components
                    if (id.includes('node_modules/@radix-ui')) {
                        return 'vendor-radix';
                    }
                    // Lucide icons
                    if (id.includes('node_modules/lucide-react')) {
                        return 'vendor-icons';
                    }
                    // Other node_modules
                    if (id.includes('node_modules')) {
                        return 'vendor-misc';
                    }
                },
            },
        },
    },
});
