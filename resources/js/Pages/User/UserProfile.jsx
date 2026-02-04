import { usePage } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout"
import { route } from "ziggy-js";
import { useState } from "react";
import ReleasesReviewTable from "../../Components/ReleasesReviewTable";

export default function UserProfile({ user, releaseReviews, reviewedReleaseBands, songReviews }) {

    const { auth } = usePage().props;

    const [tab, setTab] = useState('overview-tab');

    const [reviewTab, setReviewTab] = useState('review-releases-tab');

    const [favouritesTab, setFavouritesTab] = useState('favourite-bands-tab');

    console.log(releaseReviews)


    return (
        <>
            <AppLayout title={user.name + ' Profile'}>

                <div className="bg-blue-300 w-full h-50 flex items-center">

                    <div className="h-32 w-32 bg-black m-10 shrink-0" id="profilepic"></div>
                    <div className="w-full mr-10">
                        <h3 className="text-2xl">{user.name}</h3>
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos natus illo amet quidem nam voluptates iure laboriosam, similique cupiditate hic perferendis placeat dolorum sapiente ratione doloribus voluptatem, nesciunt magni expedita.</p>
                        {
                            auth.user.id == user.id && (
                                <>
                                    <div className="w-full h-full flex justify-end">
                                        <a className="" href={route('user.showEditProfile', auth.user.id)}><button type="button">Edit profile</button></a>
                                    </div>
                                </>
                            )
                        }
                    </div>
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

                            <h1>test</h1>
                            <ReleasesReviewTable releasesReviews={releaseReviews}/>
                        
                        </>

                    )
                }





            </AppLayout>
        </>
    )


}