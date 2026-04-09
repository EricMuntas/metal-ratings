import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Heart } from "lucide-react";

export default function LikeButton({ buttonType = 'button', itemType, item, isLiked, likesCount }) {

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

        switch (itemType) {
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
            {
                (buttonType == 'button') && (
                    <button
                        onClick={handleLike}
                        style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}
                        title={liked ? "Quitar like" : "Dar like"}
                    >
                        <span style={{ fontSize: "1.5rem" }}>{liked ? "❤️" : "🤍"}</span>
                        <span>{count} {count === 1 ? "like" : "likes"}</span>
                    </button>
                )
            }
            {
                (buttonType == 'icon') && (
                    <button
                        onClick={handleLike}
                        title={liked ? "Quitar like" : "Dar like"}
                        style={{ display: "inline-flex", alignItems: "center", background: 'none' }}
                    >
                        {
                            liked ? (
                                <Heart fill="currentColor" className="text-red-500" />
                            ) : (
                                <Heart className="text-gray-400 hover:text-red-400" />
                            )
                        }
                    </button>
                )
            }

        </>
    );


}