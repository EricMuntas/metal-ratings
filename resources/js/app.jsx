import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        // Make Ziggy route helper globally available with config from props
        const { ziggy } = props.initialPage.props;
        window.Ziggy = ziggy;

        createRoot(el).render(<App {...props} />);
    },
});