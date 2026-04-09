import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";
import LikeButton from "./LikeButton";

export default function SongsTable({ songs, onWriteReview, myReviews, likedSongIds = [] }) {

    // myReviews llega como array [{song_id, ...}], lo convertimos a {song_id: review}
    const reviewsMap = Array.isArray(myReviews)
        ? Object.fromEntries(myReviews.map(r => [r.song_id, r]))
        : (myReviews ?? {});

    return (
        <>
            <h1 className="flex justify-center text-2xl">Songs</h1>
            {(songs.length > 0) ? (
                <div className="table-container">
                    <div className="grid grid-cols-5 table-header">
                        <span className="col-span-2">Title</span>
                        <span className="col-span-1">Duration</span>
                        <span className="col-span-1">Rating</span>
                        <span className="col-span-1"></span>
                    </div>
                    {(songs ?? []).map((song) => {

                        const hasReview = !!reviewsMap[song.id];

                        return (
                            <div className="grid grid-cols-5" key={song.id}>
                                <span className="col-span-2">
                                    <Link className="link" href={"/songs/" + song.id}>
                                        {song.title}
                                    </Link>
                                </span>
                                <span className="col-span-1">{song.duration}</span>
                                <span className="col-span-1">
                                    {song.rating ?? "No rating yet"}
                                </span>
                                <span className="col-span-1 flex ">
                                    <Star
                                        className={`cursor-pointer ${hasReview ? "fill-yellow-500 text-yellow-500" : ""}`}
                                        onClick={() => onWriteReview(song)}
                                    />
                                    <LikeButton
                                        buttonType="icon"
                                        itemType="song"
                                        item={song}
                                        isLiked={likedSongIds.includes(song.id)}
                                    />
                                </span>
                            </div>
                        )
                    })}
                </div>)
                :
                (

                    <p>No songs yet</p>

                )
            }
        </>
    )
}
//   { (releases.length > 0) ? (<></>) :
//                     (
//                         <>
//                             <p>No reviews yet</p>
//                         </>
//                     )
//                 }