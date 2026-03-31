import { useState } from "react";
import ReleasesTable from "../../Components/ReleasesTable";
import SongsTable from "../../Components/SongsTable";
import WriteSongReviewModal from "../../Components/WriteSongReviewModal";
import AppLayout from "../../Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";

export default function ShowRelease({ release, myReviews, isLiked, likesCount }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedSongReview, setSelectedSongReview] = useState(null);

    const { auth } = usePage().props;

    console.log(release)

    const openWriteReviewModal = (song) => {


        setSelectedSong(song);

        if (myReviews) {
            // Convertir a array si no lo es
            const reviewsArray = Array.isArray(myReviews)
                ? myReviews
                : Object.values(myReviews);

            const foundReview = reviewsArray.find(
                (review) => review.song_id === song.id
            );

            setSelectedSongReview(foundReview || null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    // Optimistic like state
    const [liked, setLiked] = useState(isLiked);
    const [count, setCount] = useState(likesCount ?? 0);

    const handleLike = () => {
        if (!auth?.user) {
            router.visit("/login");
            return;
        }

        const nowLiked = !liked;
        setLiked(nowLiked);
        setCount((prev) => (nowLiked ? prev + 1 : prev - 1));

        router.post(
            `/bands/${release.bands[0].id}/${release.id}/like`,
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
        <AppLayout title={release.name}>
            {release.bands.map((band) => (
                <h1 key={'band' + band.id}>
                    {band.name}
                </h1>
            ))}

            <a href={''} className="link">Edit release</a>
            {/* Like button */}
            <button
                onClick={handleLike}
                style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}
                title={liked ? "Quitar like" : "Dar like"}
            >
                <span style={{ fontSize: "1.5rem" }}>{liked ? "❤️" : "🤍"}</span>
                <span>{count} {count === 1 ? "like" : "likes"}</span>
            </button>

            <SongsTable
                songs={release.songs}
                onWriteReview={openWriteReviewModal}
                myReviews={myReviews}
            />

            <WriteSongReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                song={selectedSong}
                review={selectedSongReview}
            />
        </AppLayout>
    );
}