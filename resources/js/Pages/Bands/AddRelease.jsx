import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from 'ziggy-js';
import { useState } from "react";


export default function AddRelease({ band, release_types, genres }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        release_date: '',
        type: 'LP',
        songs: [],
        genres_id: [],
    });

    
    const [genresArray, setGenres] = useState([]);


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


    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('release.storeRelease', band.id));
    };
    function handleTypeChange(e) {
        const type = e.target.value;
        setData('type', type);
    }

    function addSongContainer() {
        setData('songs', [...data.songs, { title: '', duration: '', lyrics: '' }]);
    }

    function updateSong(index, field, value) {
        const updatedSongs = [...data.songs];
        updatedSongs[index][field] = value;
        setData('songs', updatedSongs);
    }

    return (
        <AppLayout title="Add Release">

            <form onSubmit={handleSubmit}>
                <h1>Add Release</h1>

                <div>
                    <label htmlFor="name">Release name:</label>
                    <input type="text" name="name" id="" placeholder="Enter Sandman"
                        value={data.name} onChange={e => setData('name', e.target.value)} />
                </div>

                <div>
                    <label htmlFor="releaseDate">Release date:</label>
                    <input type="date" name="releaseDate" id="" value={data.release_date} onChange={e => setData('release_date', e.target.value)} />
                </div>

                <div>
                    <label htmlFor="type">Type:</label>
                    <select name="type" id="" onChange={handleTypeChange}>
                        {release_types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
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





                <div>
                    <button type="button" onClick={addSongContainer}>Add song</button>
                </div>

                {data.songs.map((song, index) => (
                    <div key={index} id="addSong">
                        <h3>Song {index + 1}:</h3>
                        <div>
                            <label htmlFor={"songTitle" + index}>Title:</label>
                            <input
                                type="text"
                                name={"songTitle" + index}
                                value={song.title}
                                onChange={e => updateSong(index, 'title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor={"songDuration" + index}>Duration:</label>
                            <input
                                type="text"
                                name={"songDuration" + index}
                                value={song.duration}
                                onChange={e => updateSong(index, 'duration', e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor={"songLyrics" + index}>Lyrics:</label>
                            <textarea
                                name={"songLyrics" + index}
                                value={song.lyrics}
                                onChange={e => updateSong(index, 'lyrics', e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                ))}

                <div>
                    <button type="submit" disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

            </form>

        </AppLayout>
    );
}