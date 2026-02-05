import { Link } from "@inertiajs/react";
import { Eye, Star } from "lucide-react";
import { route } from "ziggy-js";

export default function SongsReviewTable({ songReviews }) {


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
            {
                songReviews.length > 0 ? (
                    <>
                        <h1 className="flex justify-center text-2xl">Review Songs</h1>
                        <div className="table-container">
                            <div className="grid grid-cols-9 table-header">
                                <span className="col-span-2">
                                    Title
                                </span>
                                <span className="col-span-2">Release</span>
                                <span className="col-span-2">Band</span>
                                <span className="col-span-1">Rating</span>
                                <span className="col-span-1">Date</span>
                                <span className="col-span-1"></span>
                            </div>
                            {
                                songReviews.map((songReview, index) => (
                                    <div className="grid grid-cols-9" key={songReview.id}>
                                        <span className="col-span-2">
                                            <Link className="link" href={`/songs/${songReview.song.id}`}>{songReview.song.title}</Link>
                                        </span>
                                        <span className="col-span-2"><Link className="link" href={`/bands/${songReview.song.bands[0].id}/${songReview.song.releases[0].id}`}>{songReview.song.releases[0].name}</Link></span>
                                        <span className="col-span-2"><Link className="link" href={`/bands/${songReview.song.bands[0].id}`}>{songReview.song.bands[0].name}</Link></span>
                                        <span className="col-span-1">{songReview.rating ?? 'Error'}</span>
                                        <span className="col-span-1">{getDate(songReview.created_at)}</span>
                                        <span className="col-span-1 flex justify-center">
                                            <a href={route('song.showSongReviews', songReview.id)}>
                                                <Eye className="cursor-pointer" />
                                            </a>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) :
                    (
                        <>
                            <p>No song reviews yet</p>
                        </>

                    )
            }

        </>

    )


}