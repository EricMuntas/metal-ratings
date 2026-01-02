import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import BandsTable from "../../Components/BandsTable";

export default function Bands({ bands, genres }) {
    return (
        <AppLayout title="Bands">
            <h1>Bandas</h1>
            <BandsTable bands={bands} genres={genres}/>
        </AppLayout>
    );
}