import { Link } from "@inertiajs/react";
import SongReview from "../../Components/SongReview";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";

export default function ShowSongReviews({ song, reviews }) {

    console.log(reviews);

    return (
        <>
            <AppLayout title={song.title}>
                <div>
                    <h1>REVIEWS: 
                        <Link className="link" href={route('song.showSong', song.id)}>{song.title}</Link>
                        by {song.bands.map((band) => (
                        <Link key={'band' + band.id} className="link" href={route('band.show', band.id)}>
                            {band.name}
                        </Link>
                    ))}</h1>


                    <p>//to-do = filter</p>
                </div>
                <div>
                    {
                        reviews.map((review, index) => {
                            return (
                                <SongReview review={review} />
                            )

                        })
                    }
                </div>


            </AppLayout>
        </>

    );


}