import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

export default function Bands({ bands }) {
    return (
        <AppLayout title="Bands">
            <h1>Bandas</h1>
            <ul>
                {bands.map((band) => (
                    <li key={band.id}>
                        <Link href={"/bands/"+band.id}>{band.name} - Genre ID: {band.genre} - Year: {band.formed_year}</Link>
                    </li>
                ))}
            </ul>
        </AppLayout>
    );
}