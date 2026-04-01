import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { useState } from "react";
import { route } from "ziggy-js";

export default function EditUserProfile({ user }) {

    const { data, setData, put, processing, errors } = useForm({
        description: user.description ?? '',
        favourite_genres: user.favourite_genres ?? '',
        favourite_bands: user.favourite_bands ?? '',
        profile_pic: user.profile_pic ?? '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user.saveEditProfile', user.id));
    };

    return (
        <>
            <AppLayout title={'Edit Profile'}>
                <form onSubmit={handleSubmit}>


                    <h1>Editing your profile</h1>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id=""
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}></textarea>
                    </div>

                    <div>
                        <label htmlFor="favourite_bands">Favourite bands</label>
                        <textarea name="favourite_bands" id=""
                            value={data.favourite_bands}
                            onChange={(e) => setData('favourite_bands', e.target.value)}></textarea>
                    </div>

                    <div>
                        <label htmlFor="favourite_genres">Favourite genres</label>
                        <textarea name="favourite_genres" id=""
                            value={data.favourite_genres}
                            onChange={(e) => setData('favourite_genres', e.target.value)}></textarea>
                    </div>

                    <div>
                        <label htmlFor="profile_pic">Photo:</label>
                        <input
                            type="file"
                            name="profile_pic"
                            accept="image/*"
                            onChange={e => setData('profile_pic', e.target.files[0])}
                        />
                        {errors.profile_pic && <span className="error">{errors.profile_pic}</span>}
                    </div>

                    <button type="submit">Submit</button>

                </form>


            </AppLayout>
        </>

    )

}