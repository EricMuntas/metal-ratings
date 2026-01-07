import AppLayout from "../../Layouts/AppLayout";
import { useForm } from '@inertiajs/react';
import { useState } from "react";
import { route } from 'ziggy-js';

export default function AddBand({ genres }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        formed_year: '',
        genres_id: [],
        country: '',
        rating: null,
    });

    const [genresArray, setGenres] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('band.storeBand'));
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);

        if (data.genres_id.includes(genreId)) {
            setData('genres_id', data.genres_id.filter(id => id !== genreId));
        } else {
            setData('genres_id', [...data.genres_id, genreId]);
        }
    };

    function addGenreContainer() {
        setGenres([...genresArray, { genre_id: '' }]);
    }


    return (
        <AppLayout title="Add Band">
            <form onSubmit={handleSubmit}>
                <h1>Add Band</h1>

                <div>
                    <label htmlFor="bandName">Band Name:</label>
                    <input
                        type="text"
                        placeholder="Metallica"
                        name="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div>
                    <label htmlFor="yearFormed">Year Formed:</label>
                    <input
                        type="number"
                        placeholder="1981"
                        name="formed_year"
                        value={data.formed_year}
                        onChange={e => setData('formed_year', e.target.value)}
                    />
                    {errors.formed_year && <span className="error">{errors.formed_year}</span>}
                </div>

                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        placeholder="US"
                        name="country"
                        value={data.country}
                        onChange={e => setData('country', e.target.value)}
                    />
                    {errors.formed_year && <span className="error">{errors.formed_year}</span>}
                </div>

                <div>
                    <label htmlFor="maingenre">Genres:</label>
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
                            <label htmlFor={"newGenre" + 1}>Genre {index + 2 }:</label>
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




                <button type="submit" disabled={processing}>
                    {processing ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </AppLayout>
    );
}