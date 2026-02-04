import { Link } from "@inertiajs/react";
import { usePage, router } from '@inertiajs/react';
import { route } from "ziggy-js";

export default function Navbar() {

    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post('/logout');
    };



    return (
        <nav>
            <ul>
                <li>
                    <Link href={'/'}>HOME</Link>
                </li>
                <li>
                    <Link href={'/bands'}>DISCOVER</Link>
                </li>
                <li>
                    <Link href={'/add-band'}>ADD BAND</Link>
                </li>

                <li>
                    <Link href={'/add-genre'}>ADD GENRE</Link>
                </li>
                <li>
                    <Link href={route('user.showProfile', auth.user.id)}>{auth.user.name}</Link>
                </li>
                <li>
                    <span onClick={handleLogout} className="cursor-pointer">Cerrar Sesión</span>
                </li>
            </ul>
        </nav>
    );
}