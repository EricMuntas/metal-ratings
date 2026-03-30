import { Link } from "@inertiajs/react";
import { Eye, Grid, Star, Table, Table2 } from "lucide-react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import GridItem from "./GridItem";

export default function BandsTable({ bands }) {

    // Inicializar desde localStorage o usar 'table' como default
    const [gridView, setGridView] = useState(() => {
        return localStorage.getItem('gridView') || 'table';
    });

    // Guardar en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('gridView', gridView);
    }, [gridView]);


    function getYear(release_date) {
        return release_date.split('-')[0];
    }

    function getDate(date) {
        const d = new Date(date)

        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()

        return `${day}/${month}/${year}`
    }


    return (

        <>
            <div className="w-full flex justify-end h-12">
                <button className="grid-toggler" type="button" onClick={() => setGridView('table')}>
                    <Table2 />
                </button>
                <button className="grid-toggler" type="button" onClick={() => setGridView('grid')}>
                    <Grid />
                </button>
            </div>


            {
                (bands.length > 0) ? (
                    <>
                        {
                            (gridView == 'table') && (
                                <>
                                    <h1 className="flex justify-center text-2xl">Bands</h1>

                                    <div className="table-container">
                                        <div className="grid grid-cols-8 table-header">
                                            <span className="col-span-3">Name</span>
                                            <span className="col-span-2">Genre</span>
                                            <span className="col-span-1">Country</span>
                                            <span className="col-span-1">Formed Year</span>
                                            <span className="col-span-1">Rating</span>
                                        </div>
                                        {
                                            bands.map((band) => (
                                                <div className="grid grid-cols-8" key={band.id}>
                                                    <span className="col-span-3">
                                                        <Link className="link" href={"/bands/" + band.id}>
                                                            {band.name}
                                                        </Link>
                                                    </span>
                                                    <span className="col-span-2">
                                                        {band.genres && band.genres.length > 0
                                                            ? band.genres.map(g => g.name).join(', ')
                                                            : 'Unknown'}
                                                    </span>
                                                    <span className="col-span-1">{band.country}</span>
                                                    <span className="col-span-1">{band.formed_year}</span>
                                                    <span className="col-span-1">
                                                        {band.rating ?? "No rating yet"}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            )}


                        {(gridView == 'grid') && (
                            <>

                                <div className="grid grid-cols-3 w-full gap-4 mb-10">
                                    {
                                        bands.map((band, index) => (
                                            <GridItem item={band} type={'band'} key={band.id} ></GridItem>
                                        ))
                                    }


                                    {/* <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem>
                                    <GridItem></GridItem> */}
                                </div>

                            </>
                        )}


                    </>

                )
                    :
                    (
                        <>
                            <p>No reviews yet</p>
                        </>
                    )
            }

        </>

    )


}