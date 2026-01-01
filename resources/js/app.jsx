import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { Ziggy } from './ziggy';
import { route as ziggyRoute } from 'ziggy-js';

// Make it globally available
window.route = (name, params, absolute) => ziggyRoute(name, params, absolute, Ziggy);

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});