import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from 'ziggy-js';
import { useState } from "react";

export default function AddRelease({ band, release_types }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        release_date: '',
        type: 'LP',
        songs: [],
    });

    const [songs, setSongs] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the form data with songs before submitting
        setData('songs', songs);
        post(route('bands.storeRelease', band.id));
    };

    function handleTypeChange(e) {
        const type = e.target.value;
        setData('type', type);
    }

    function addSongContainer() {
        setSongs([...songs, { title: '', duration: '', lyrics: '' }]);
    }

    function updateSong(index, field, value) {
        const updatedSongs = [...songs];
        updatedSongs[index][field] = value;
        setSongs(updatedSongs);
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
                    <button type="button" onClick={addSongContainer}>Add song</button>
                </div>

                {songs.map((song, index) => (
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