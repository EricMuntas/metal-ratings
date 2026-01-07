import { Link } from "@inertiajs/react";

export default function SongReview({review}) {
    return (
        <>
            <div>
                <span><Link className="link">Usuario {review.user_id}</Link></span>
                <p>{review.review}</p>
                <span>{review.rating}</span>
            </div>
        </>
    )
}