import { useState } from "react";
import ReleasesTable from "../../Components/ReleasesTable";
import SongsTable from "../../Components/SongsTable";
import WriteSongReviewModal from "../../Components/WriteSongReviewModal";
import AppLayout from "../../Layouts/AppLayout";

export default function ShowRelease({ release, myReviews }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedSongReview, setSelectedSongReview] = useState(null);

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

    return (
        <AppLayout title={release.name}>
            {release.bands.map((band) => (
                <h1 key={'band' + band.id}>
                    {band.name}
                </h1>
            ))}

            <a href={''} className="link">Edit release</a>

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