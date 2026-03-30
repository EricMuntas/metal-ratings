import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import ReleasesTable from "../../Components/ReleasesTable";
import AppLayout from "../../Layouts/AppLayout";
import WriteReleaseReviewModal from "../../Components/WriteReleaseReviewModal";

export default function BandProfile({ band, releases, band_genres, myReviews, isLiked, likesCount }) {
    const { auth } = usePage().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState(null);
    const [selectedReleaseReview, setSelectedReleaseReview] = useState(null);

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
            `/bands/${band.id}/like`,
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

    const openWriteReleaseReviewModal = (release) => {
        setSelectedRelease(release);

        if (myReviews) {
            const reviewsArray = Array.isArray(myReviews)
                ? myReviews
                : Object.values(myReviews);

            const foundReview = reviewsArray.find(
                (review) => review.release_id === release.id
            );

            setSelectedReleaseReview(foundReview || null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRelease(null);
    };

    return (
        <AppLayout title={band.name}>
            <h1 className="text-4xl">{band.name}</h1>
            <p>Year formed: {band.formed_year}</p>

            {/* Like button */}
            <button
                onClick={handleLike}
                style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}
                title={liked ? "Quitar like" : "Dar like"}
            >
                <span style={{ fontSize: "1.5rem" }}>{liked ? "❤️" : "🤍"}</span>
                <span>{count} {count === 1 ? "like" : "likes"}</span>
            </button>

            {releases.map((release, index) => (
                <h1 key={index}>
                    {release.name}
                </h1>
            ))}

            <a href={'/bands/' + band.id + '/add-release'} className="link">Add release</a>

            <ReleasesTable
                releases={releases}
                onWriteReleaseReview={openWriteReleaseReviewModal}
                band_id={band.id}
                myReviews={myReviews}
            />

            <WriteReleaseReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                release={selectedRelease}
                review={selectedReleaseReview}
            />
        </AppLayout>
    );
}