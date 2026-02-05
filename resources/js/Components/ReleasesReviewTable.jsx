import { Link } from "@inertiajs/react";
import { Eye, Grid, Star, Table, Table2 } from "lucide-react";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import GridItem from "./GridItem";

export default function ReleasesReviewTable({ releasesReviews }) {

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
                (releasesReviews.length > 0) ? (
                    <>
                        {
                            (gridView == 'table') && (
                                <>
                                    <h1 className="flex justify-center text-2xl">Review Releases</h1>
                                    <div className="table-container">
                                        <div className="grid grid-cols-9 table-header">
                                            <span className="col-span-2">
                                                Name
                                            </span>
                                            <span className="col-span-2">Band</span>
                                            <span className="col-span-1">Type</span>
                                            <span className="col-span-1">Release</span>
                                            <span className="col-span-1">Rating</span>
                                            <span className="col-span-1">Date</span>
                                            <span className="col-span-1"></span>
                                        </div>
                                        {
                                            releasesReviews.map((releaseReview, index) => (
                                                <div className="grid grid-cols-9" key={releaseReview.id}>
                                                    <span className="col-span-2">
                                                        <Link className="link" href={/bands/ + releaseReview.release.bands.id + '/' + releaseReview.release.id}>{releaseReview.release.name}</Link>
                                                    </span>
                                                    <span className="col-span-2"><Link className="link" href={/bands/ + releaseReview.release.bands[0].id}>{releaseReview.release.bands[0].name}</Link></span>
                                                    <span className="col-span-1"> {releaseReview.release.type}</span>
                                                    <span className="col-span-1"> {getYear(releaseReview.release.release_date)}</span>
                                                    <span className="col-span-1">{releaseReview.rating ?? 'Error'}</span>
                                                    <span className="col-span-1">{getDate(releaseReview.created_at)}</span>
                                                    <span className="col-span-1 flex justify-center">
                                                        <a href={route('song.showSongReviews', releaseReview.id)}>
                                                            <Eye className="cursor-pointer" />
                                                        </a>
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
                                        releasesReviews.map((releaseReview, index) => (
                                            <GridItem release={releaseReview} key={releaseReview.id}></GridItem>
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