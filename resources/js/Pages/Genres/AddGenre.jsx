import { useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import { route } from "ziggy-js";

export default function AddGenre({ }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('genre.store'));
    };

    return (
        <AppLayout title="Add genre">
            <form onSubmit={handleSubmit}>
                <h1>Add genre</h1>

                <label htmlFor="genreName">Genre name:</label>

                <input
                    type="text"
                    name="genreName"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    placeholder="Heavy Metal"
                />

                <button type="submit">Submit</button>
            </form>



        </AppLayout>
    )


}