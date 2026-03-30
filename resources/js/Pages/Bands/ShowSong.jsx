import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function ShowSong({ song, isLiked, likesCount }) {

    const { auth } = usePage().props;

    // Optimistic like state
    const [liked, setLiked] = useState(isLiked);
    const [count, setCount] = useState(likesCount ?? 0);

    const handleLike = () => {
        if (!auth?.user) {
            router.visit("/login");
            return;
        }

        // Optimistic update
        const nowLiked = !liked;
        setLiked(nowLiked);
        setCount((prev) => (nowLiked ? prev + 1 : prev - 1));

        router.post(
            `/songs/${song.id}/like`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    // Revert on error
                    setLiked(liked);
                    setCount(count);
                },
            }
        );
    };

    return (

        <>
            <AppLayout title={song.title}>
                {/* Like button */}
                <button
                    onClick={handleLike}
                    style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}
                    title={liked ? "Quitar like" : "Dar like"}
                >
                    <span style={{ fontSize: "1.5rem" }}>{liked ? "❤️" : "🤍"}</span>
                    <span>{count} {count === 1 ? "like" : "likes"}</span>
                </button>
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