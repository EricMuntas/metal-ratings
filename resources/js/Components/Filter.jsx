import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Filter({ genres }) {

    const { data, setData, get, processing, errors } = useForm({
        name: '',
        status: '',
        genre: '',
    });

    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

    const handleOptionsButton = () => {

        setIsMoreOptionsOpen(!isMoreOptionsOpen);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('band.searchBand'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCleanClick = () => {
        setData('name', '');
        setData('status', '');
        setData('genre', '');
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-1/2 h-26 m-10">
                <div className=" bg-gray-400 border rounded-2xl">
                    <span>Search</span>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Band"
                        />
                    </div>
                    {isMoreOptionsOpen && (
                        <div>
                            <div>
                                <label htmlFor="status">Status:</label>
                                <select
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Split Up">Split Up</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="genre">Genre:</label>
                                <select
                                    name="genre"
                                    value={data.genre}
                                    onChange={(e) => setData('genre', e.target.value)}
                                >
                                    <option value="">Select genre...</option>
                                    {
                                        genres.map((genre) => (
                                            <option value={genre.id} key={genre.id}>
                                                {genre.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <button type="button" onClick={handleOptionsButton}>More options</button>
                            <button type="button" onClick={handleCleanClick}>
                                Clean
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" disabled={processing}>
                                {processing ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </>
    );
}