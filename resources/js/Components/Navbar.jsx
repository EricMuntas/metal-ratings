import { Link } from "@inertiajs/react";

export default function Navbar() {
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
            </ul>
        </nav>
    );
}