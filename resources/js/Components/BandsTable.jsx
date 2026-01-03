import { Link } from "@inertiajs/react";

export default function BandsTable({ bands }) {

    return (
        <>
            <h1 className="flex justify-center text-2xl">Bands</h1>

            <div className="border rounded-xl m-8 p-2 border-black">
                <div className="grid grid-cols-8 bg-gray-100">
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
                                    : 'No genres'}
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
    );
}