import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from 'ziggy-js';

export default function AddRelease({ band, release_types }) {


    const { data, setData, post, processing, errors } = useForm({
        name: '',
        release_date: '',
        type: 'LP',
    });

    const handleSubmit = (e) => { 
        e.preventDefault();
        // console.log(data);
        post(route('bands.storeRelease', band.id));
    };

    function handleTypeChange(e) {

        const type = e.target.value;

        setData('type', type);

        // if (data.genres_id.includes(genreId)) {
        //     setData('genres_id', data.genres_id.filter(id => id !== genreId));
        // } else {
        //     setData('genres_id', [...data.genres_id, genreId]);
        // }

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
                    <button type="submit" disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

            </form>

        </AppLayout>

    );


}