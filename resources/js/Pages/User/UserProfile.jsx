import { usePage } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout"
import { route } from "ziggy-js";
import { useState } from "react";
import SongsReviewTable from "../../Components/SongsReviewTable";
import BandsTable from "../../Components/BandsTable";
import ReleasesTable from "../../Components/ReleasesTable";
import SongsTable from "../../Components/SongsTable";

export default function UserProfile({ user, releaseReviews, reviewedReleaseBands, songReviews, likedBands, likedReleases, likedSongs }) {

    const { auth } = usePage().props;

    const [tab, setTab] = useState('overview-tab');

    const [reviewTab, setReviewTab] = useState('review-releases-tab');

    const [favouritesTab, setFavouritesTab] = useState('favourite-bands-tab');

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


    return (
        <>
            <AppLayout title={user.name + ' Profile'}>

                <div className="bg-blue-300 w-full h-fit md:h-50 flex items-center flex-col md:flex-row p-10  gap-8">

                    {/* <div className="h-32 w-32 bg-black shrink-0" id="profilepic"></div> */}

                    {
                        (user.profile_pic) ? (
                            <>
                                {/* todo -> add image */}
                                <img src={`/storage/${user.profile_pic}`} alt="" className="bg-gray-200 h-32 w-32 shrink-0 select-none" draggable="false" />
                            </>
                        ) : (
                            <>
                                <div id="img" className="bg-gray-200 h-32 w-32 flex justify-center items-center shrink-0">
                                    <span className="text-white text-8xl select-none text-center">?</span>
                                </div>
                            </>
                        )
                    }

                    <div className="w-full h-full flex flex-col items-center md:items-start overflow-hidden">
                        <div><h3 className="text-2xl">{user.name}</h3></div>
                        <div className="overflow-y-auto max-h-24">
                            <p className="wrap-break-word">
                                {user.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde explicabo id, nemo iusto, quisquam itaque eius molestias quasi harum nostrum officiis facilis neque et consectetur? Totam vitae necessitatibus odio voluptas."}
                            </p>
                        </div>
                    </div>

                    {
                        auth.user.id == user.id && (
                            <>
                                <div className="w-40 h-full flex justify-center md:items-end">
                                    <a className="flex justify-end" href={route('user.showEditProfile', auth.user.id)}><button type="button">Edit profile</button></a>
                                </div>
                            </>
                        )
                    }
                </div>
                {/* Profile Tabs */}
                <div className="bg-black w-full h-12 flex items-center justify-between text-white">
                    {/* profile-nav -> App.css */}
                    <div className="profile-nav" id="overview-tab" onClick={() => setTab('overview-tab')}>OVERVIEW</div>
                    <div className="profile-nav" id="reviews-tab" onClick={() => setTab('reviews-tab')}>REVIEWS</div>
                    <div className="profile-nav" id="favourite-tab" onClick={() => setTab('favourites-tab')}>FAVOURITES</div>
                </div>

                {/* Review Tabs */}
                {
                    tab == 'reviews-tab' && (
                        <>
                            <div className="bg-black w-full h-12 flex items-center justify-between text-white">
                                <div className="profile-nav" id="review-releases-tab" onClick={() => setReviewTab('review-releases-tab')}>Releases</div>
                                <div className="profile-nav" id="review-songs-tab" onClick={() => setReviewTab('review-songs-tab')}>Songs</div>
                            </div>
                        </>
                    )
                }

                {
                    tab == 'favourites-tab' && (
                        <>
                            <div className="bg-black w-full h-12 flex items-center justify-between text-white">
                                <div className="profile-nav" id="favourite-bands-tab" onClick={() => setFavouritesTab('favourite-bands-tab')}>Bands</div>
                                <div className="profile-nav" id="favourite-releases-tab" onClick={() => setFavouritesTab('favourite-releases-tab')}>Releases</div>
                                <div className="profile-nav" id="favourite-songs-tab" onClick={() => setFavouritesTab('favourite-songs-tab')}>Songs</div>
                            </div>
                        </>
                    )
                }

                {/* Content */}

                {
                    (tab == 'reviews-tab' && reviewTab == 'review-releases-tab') && (

                        <>
                            <ReleasesTable releases={releaseReviews} isReview={true} />
                        </>

                    )
                }
                {
                    (tab == 'reviews-tab' && reviewTab == 'review-songs-tab') && (
                        <>
                            <SongsReviewTable songReviews={songReviews} />
                        </>
                    )
                }
                {
                    (tab == 'favourites-tab' && favouritesTab == 'favourite-bands-tab') && (
                        <>
                            <BandsTable bands={likedBands}></BandsTable>
                        </>
                    )
                }
                {
                    (tab == 'favourites-tab' && favouritesTab == 'favourite-releases-tab') && (
                        <>
                            <ReleasesTable releases={likedReleases} onWriteReview={openWriteReviewModal} myReviews={releaseReviews}></ReleasesTable>
                        </>
                    )
                }
                {
                    (tab == 'favourites-tab' && favouritesTab == 'favourite-songs-tab') && (
                        <>
                            <SongsTable songs={likedSongs} onWriteReview={openWriteReviewModal} myReviews={songReviews} ></SongsTable>
                        </>
                    )
                }



            </AppLayout>
        </>
    )


}