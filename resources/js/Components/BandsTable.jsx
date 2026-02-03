import { Link } from "@inertiajs/react";

export default function BandsTable({ bands }) {

    return (
        <>
            {bands.length > 0 ? (
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
            ) : (
            <> 
            <h1>No bands found</h1>
            </>
            )}
        </>
    );
}