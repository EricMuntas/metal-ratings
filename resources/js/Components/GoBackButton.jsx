import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { route } from "ziggy-js";

export default function GoBackButton({ goTo, params = {} }) {

    let routeName = '';

    switch (goTo) {
        case 'discover':
            routeName = 'band.index';
            break;
        case 'band':
            routeName = 'band.show';
            break;
        case 'release':
            routeName = 'release.show';
            break;
        default:
            routeName = 'dashboard';
            break;
    }

    return (
        <>
            <Link href={route(routeName, params)} className="w-full p-2 flex justify-start">
                <ArrowLeft />
                <span>Go back</span>
            </Link>
        </>
    );
}