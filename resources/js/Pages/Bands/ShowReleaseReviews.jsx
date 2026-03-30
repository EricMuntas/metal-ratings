import { Link } from "@inertiajs/react";
import SongReview from "../../Components/SongReview";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";

export default function ShowReleaseReviews({ release, reviews }) {

    console.log(reviews)


    return (
        <>
            <AppLayout title={release.title}>
                <div>
                    <h1>REVIEWS:
                        {/* <Link className="link" href={route('release.showRelease', release.id)}>{release.title}</Link>
                        by {release.bands.map((band) => (
                            <Link key={'band' + band.id} className="link" href={route('band.show', band.id)}>
                                {band.name}
                            </Link>
                        ))} */}
                    </h1>


                    <p>//to-do = filter</p>
                </div>
                <div>
                    {
                        reviews.map((review, index) => {
                            return (
                                <SongReview review={review} key={review.id} />
                            )

                        })
                    }
                </div>


            </AppLayout>
        </>

    );


}