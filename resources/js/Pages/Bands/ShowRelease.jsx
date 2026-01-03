import { useState } from "react";
import ReleasesTable from "../../Components/ReleasesTable";
import SongsTable from "../../Components/SongsTable";
import WriteReviewModal from "../../Components/WriteReviewModal";
import AppLayout from "../../Layouts/AppLayout";

export default function ShowRelease({ release }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const openWriteReviewModal = (song) => {
        setSelectedSong(song);
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
            />

            <WriteReviewModal 
                isOpen={isModalOpen} 
                onClose={closeModal}
                song={selectedSong}
            />
        </AppLayout>
    );
}