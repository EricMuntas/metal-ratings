import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { useState } from "react";

export default function EditUserProfile({ user, genres }) {

    const { data, setData, put, processing, errors } = useForm({

        description: '',
        favourite_genres: [],
        favourite_bands: [],

    });

    const [genresArray, setGenres] = useState([]);

    function addGenreContainer() {
        setGenres([...genresArray, { favourite_genres: '' }]);
    }

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);

        if (data.favourite_genres.includes(genreId)) {
            setData('favourite_genres', data.favourite_genres.filter(id => id !== genreId));
        } else {
            setData('favourite_genres', [...data.favourite_genres, genreId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.editProfile'), {
            forceFormData: true,
        });
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
                       {/* <div>
                        <label htmlFor="description">Favourite Bands:</label>
                        <textarea name="description" id=""
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}></textarea>
                    </div> */}
                    <div>
                        <label htmlFor="">Favourite genres</label>
                        <select name="maingenre" onChange={handleGenreChange}>
                            <option value="0">Select a genre...</option>
                            {
                                genres.map((genre, index) => (
                                    <option value={genre.id} key={genre.id}>{genre.name}</option>
                                ))
                            }

                        </select>
                        {errors.genres_id && <span className="error">{errors.genres_id}</span>}
                    </div>
                    <div>
                        <button type="button" onClick={addGenreContainer}>Add more genre</button>
                    </div>
                    {
                        genresArray.map((newGenre, index) => (

                            <div key={index} >
                                <label htmlFor={"newGenre" + 1}>Genre {index + 2}:</label>
                                <select name="maingenre" onChange={handleGenreChange}>
                                    <option value="0">Select a genre...</option>
                                    {
                                        genres.map((genre, index) => (
                                            <option value={genre.id} key={genre.id}>{genre.name}</option>
                                        ))
                                    }

                                </select>
                                {errors.genres_id && <span className="error">{errors.genres_id}</span>}
                            </div>

                        ))
                    }
                </form>


            </AppLayout>
        </>

    )

}