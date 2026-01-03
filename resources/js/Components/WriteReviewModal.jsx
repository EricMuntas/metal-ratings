export default function WriteReviewModal({ isOpen, onClose, song }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center" onClick={onClose}>
            <div className="z-30 bg-white rounded-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl mb-4">
                    Write Review for: {song?.title}
                </h2>
                <button 
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-200 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
}