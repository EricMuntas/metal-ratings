import { Head } from '@inertiajs/react';
import Navbar from "../Components/Navbar";

export default function AppLayout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}