import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import ReleasesTable from "../../Components/ReleasesTable";
import AppLayout from "../../Layouts/AppLayout";
import WriteReleaseReviewModal from "../../Components/WriteReleaseReviewModal";
import LikeButton from "../../Components/LikeButton";
import { route } from "ziggy-js";
import GoBackButton from "../../Components/GoBackButton";

export default function BandProfile({ band, releases, band_genres, myReviews, isLiked, likesCount }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState(null);
    const [selectedReleaseReview, setSelectedReleaseReview] = useState(null);


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

            <GoBackButton goTo={'discover'}></GoBackButton>

            <h1 className="text-4xl">{band.name}</h1>
            <p>Year formed: {band.formed_year}</p>

            {/* Like button */}
            <LikeButton type={'band'} item={band} isLiked={isLiked} likesCount={likesCount}> </LikeButton>

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