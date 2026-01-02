import { Link } from "@inertiajs/react";

export default function BandsTable({ bands, genres }) {

    function getGenreName(genreId) {
        const genre = genres.find(g => g.id == genreId);
        return genre ? genre.name : "Unknown";
    }

    function getGenreNames(genresIdArray) {
        try {

            const genresArray = typeof genresIdArray === 'string'
                ? JSON.parse(genresIdArray)
                : genresIdArray;

            return genresArray.map(id => getGenreName(id)).join(', ');
        } catch (error) {
            return "Unknown";
        }
    }

    return (
        <>
            <h1 className="flex justify-center text-2xl">Bands</h1>

            <div className="border rounded-xl m-8 p-2 border-black">
                <div className="grid grid-cols-8 bg-gray-100">
                    <span className="col-span-3">
                        Name
                    </span>
                    <span className="col-span-2">Genre</span>
                    <span className="col-span-1">Country</span>
                    <span className="col-span-1">Formed Year</span>
                    <span className="col-span-1">Rating</span>
                </div>
                {
                    bands.map((band, index) => (
                        <div className="grid grid-cols-8" key={band.id}>
                            <span className="col-span-3">
                                <Link className="link" href={"/bands/" + band.id}>{band.name}</Link>
                            </span>
                            <span className="col-span-2">

                                {getGenreNames(band.genres_id)}


                            </span>
                            <span className="col-span-1"> {band.country}</span>
                            <span className="col-span-1"> {band.formed_year} </span>
                            <span className="col-span-1">{band.rating ?? "No rating yet"}</span>
                        </div>

                    ))
                }




            </div>
        </>
    );

}