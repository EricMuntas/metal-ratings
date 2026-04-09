import { Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import LikeButton from "../../Components/LikeButton";
import GoBackButton from "../../Components/GoBackButton";

export default function ShowSong({ song, isLiked, likesCount }) {

    const { auth } = usePage().props;


    return (

        <>
            <AppLayout title={song.title}>
                <GoBackButton goTo="release" params={{ band: song.bands[0].id, release: song.releases[0].id }} />

                <LikeButton itemType={'song'} item={song} isLiked={isLiked} likesCount={likesCount}></LikeButton>
                <div>
                    <h1>{song.title}</h1>
                    <p>{song.lyrics}</p>
                </div>

                <div>
                    <Link href={route('song.showSongReviews', song.id)} className="link">Reviews</Link>
                </div>

            </AppLayout>
        </>

    );


}