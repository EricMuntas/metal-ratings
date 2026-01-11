import { Head } from '@inertiajs/react';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';

export default function AppLayout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="grow flex items-center flex-col mx-auto w-5/6">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
