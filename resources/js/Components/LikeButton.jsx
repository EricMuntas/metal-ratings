import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function LikeButton({ type, item, isLiked, likesCount }) {

    console.log(item)


    const [liked, setLiked] = useState(isLiked);
    const [count, setCount] = useState(likesCount ?? 0);

    const { auth } = usePage().props;

    const handleLike = () => {
        if (!auth?.user) {
            router.visit("/login");
            return;
        }

        // Optimistic update
        const nowLiked = !liked;
        setLiked(nowLiked);
        setCount((prev) => (nowLiked ? prev + 1 : prev - 1));

        let route = '';

        switch (type) {
            case 'song':
                route = `/songs/${item.id}/like`;
                break;
            case 'band':
                route = `/bands/${item.id}/like`;
                break;
            case 'release':
                route = `/bands/${item.bands[0].id}/${item.id}/like`;
                break;
            default:
                break;
        }

        router.post(
            route,
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
            <button
                onClick={handleLike}
                style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}
                title={liked ? "Quitar like" : "Dar like"}
            >
                <span style={{ fontSize: "1.5rem" }}>{liked ? "❤️" : "🤍"}</span>
                <span>{count} {count === 1 ? "like" : "likes"}</span>
            </button>

        </>
    );


}