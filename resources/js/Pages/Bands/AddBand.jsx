import AppLayout from "../../Layouts/AppLayout";
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function AddBand({ genres }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        formed_year: '',
        genres_id: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bands.storeBand'));
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);
        
        if (data.genres_id.includes(genreId)) {
            setData('genres_id', data.genres_id.filter(id => id !== genreId));
        } else {
            setData('genres_id', [...data.genres_id, genreId]);
        }
    };

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
                    <label>Genres:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="1"
                                checked={data.genres_id.includes(1)}
                                onChange={handleGenreChange}
                            />
                            Genre 1
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="2"
                                checked={data.genres_id.includes(2)}
                                onChange={handleGenreChange}
                            />
                            Genre 2
                        </label>
                    </div>
                    {errors.genres_id && <span className="error">{errors.genres_id}</span>}
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </AppLayout>
    );
}