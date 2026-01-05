import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useEffect } from "react";

export default function WriteReviewModal({ isOpen, onClose, song }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // user_id: '',
        rating: null,
        review: '',
        song_id: song?.id,
    });

    useEffect(() => {
        if (song) {
            setData('song_id', song.id);
        }
    }, [song]);

    // Don't return early before hooks
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hola');
        console.log(data);
        post(route('review.storeSongReview'), {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    function handleReviewChange(e) {
        const rating = parseInt(e.target.value);
        setData('rating', rating);
    }

    // Return early AFTER hooks
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">
                    Write Review for: {song?.title}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Rating:</label>
                        <select
                            value={data.rating ?? ''}
                            onChange={handleReviewChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select rating</option>
                            {Array.from({ length: 11 }, (_, index) => (
                                <option key={index} value={index}>
                                    {index}
                                </option>
                            ))}
                        </select>
                        {errors.rating && (
                            <span className="text-red-500 text-sm">{errors.rating}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Review:</label>
                        <textarea
                            value={data.review}
                            onChange={(e) => setData('review', e.target.value)}
                            className="w-full border p-2 rounded"
                            rows="4"
                        />
                        {errors.review && (
                            <span className="text-red-500 text-sm">{errors.review}</span>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}