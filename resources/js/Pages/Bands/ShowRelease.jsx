import { useState } from "react";
import ReleasesTable from "../../Components/ReleasesTable";
import SongsTable from "../../Components/SongsTable";
import WriteSongReviewModal from "../../Components/WriteSongReviewModal";
import AppLayout from "../../Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";
import LikeButton from "../../Components/LikeButton";
import GoBackButton from "../../Components/GoBackButton";

export default function ShowRelease({ release, myReviews, isLiked, likesCount, likedSongIds }) {
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

    return (
        <AppLayout title={release.name}>

            <GoBackButton goTo="band" params={{ id: release.bands[0].id }} />


            {release.bands.map((band) => (
                <h1 key={'band' + band.id}>
                    {band.name}
                </h1>
            ))}

            <a href={''} className="link">Edit release</a>

            <LikeButton itemType={'release'} item={release} isLiked={isLiked} likesCount={likesCount}></LikeButton>

            <SongsTable
                songs={release.songs}
                onWriteReview={openWriteReviewModal}
                myReviews={myReviews}
                likedSongIds={likedSongIds ?? []}
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