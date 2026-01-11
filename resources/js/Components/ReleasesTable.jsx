import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function ReleasesTable({ releases, onWriteReleaseReview, band_id, myReviews }) {

    function getYear(release_date) {
        return release_date.split('-')[0];
    }

    return (
        <>
            <h1 className="flex justify-center text-2xl">Releases</h1>
            <div className="table-container">
                <div className="grid grid-cols-8 table-header">
                    <span className="col-span-3">
                        Name
                    </span>
                    <span className="col-span-2">Type</span>
                    <span className="col-span-1">Release</span>
                    <span className="col-span-1">Rating</span>
                </div>
                {
                    releases.map((release, index) => (
                        <div className="grid grid-cols-8" key={release.id}>
                            <span className="col-span-3">
                                <Link className="link" href={/bands/ + band_id + '/' + release.id}>{release.name}</Link>
                            </span>
                            <span className="col-span-2"> {release.type}</span>
                            <span className="col-span-1"> {getYear(release.release_date)}</span>
                            <span className="col-span-1">{release.rating ?? 'No rating yet'}</span>
                            <span className="col-span-1">
                                <Star
                                    className={`cursor-pointer ${myReviews[release.id] ? "bg-yellow-500" : ""
                                        }`}
                                    onClick={() => onWriteReleaseReview(release)}
                                />
                            </span>
                        </div>
                    ))
                }
            </div>
        </>
    );

}