import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";

export default function ShowSong({song}) {


    console.log(song);

    return (

        <>
            <AppLayout title={song.title}>

        <div>
            <h1>{song.title}</h1>
            <p>{song.lyrics}</p>
        </div>

<div>
    <Link href={route('song.showSongReviews', song.id)} className="link">Reviews</Link>
</div>

            </AppLayout>
        </>

    );


}