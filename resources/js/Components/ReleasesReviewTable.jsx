import { Link } from "@inertiajs/react";
import { Eye, Star } from "lucide-react";
import { route } from "ziggy-js";

export default function ReleasesReviewTable({ releasesReviews }) {


    function getYear(release_date) {
        return release_date.split('-')[0];
    }

    return (

        <>
            <h1 className="flex justify-center text-2xl">Review Releases</h1>
            <div className="table-container">
                <div className="grid grid-cols-8 table-header">
                    <span className="col-span-3">
                        Name
                    </span>
                    <span className="col-span-2">Type</span>
                    <span className="col-span-1">Release</span>
                    <span className="col-span-1">Given rating</span>
                </div>
                {
                    releasesReviews.map((releaseReview, index) => (
                        <div className="grid grid-cols-8" key={releaseReview.id}>
                            <span className="col-span-3">
                                <Link className="link" href={/bands/ + releaseReview.release.bands.id + '/' + releaseReview.release.id}>{releaseReview.release.name}</Link>
                            </span>
                            <span className="col-span-2"> {releaseReview.release.type}</span>
                            <span className="col-span-1"> {getYear(releaseReview.release.release_date)}</span>
                            <span className="col-span-1">{releaseReview.rating ?? 'Error'}</span>
                            <span className="col-span-1">
                                <a href={route('song.showSongReviews', releaseReview.id)}>
                                    <Eye className="cursor-pointer" />
                                </a>
                            </span>
                        </div>
                    ))
                }
            </div>
        </>

    )


}