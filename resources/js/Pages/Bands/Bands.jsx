import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import BandsTable from "../../Components/BandsTable";
import BandCarrousel from "../../Components/BandCarrousel";
import Filter from "../../Components/Filter";

export default function Bands({ bands, genres, band_genres }) {

    return (
        <AppLayout title="Bands">
            
            <h1>Bandas</h1>
        
            <BandCarrousel bands={bands} maxBandsShown={3}></BandCarrousel>
            <Filter genres={genres}></Filter>
            <BandsTable bands={bands}/>
            
        </AppLayout>
    );
}