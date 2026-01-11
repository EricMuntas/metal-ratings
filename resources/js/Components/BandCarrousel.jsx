import { Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function BandCarrousel({ bands, maxBandsShown }) {

    const [photos, setPhotos] = useState(0);

    const handleNextPhoto = () => {
        if (photos >= maxBandsShown - 1) {
            setPhotos(0);
        } else {
            setPhotos(photos + 1);
        }
    }

    const handlePreviousPhoto = () => {
        if (photos <= 0) {
            setPhotos(maxBandsShown - 1);
        } else {
            setPhotos(photos - 1);
        }
    }

    if (!bands || bands.length === 0) {
        return <p>No bands available</p>;
    }

    return (
        <div className="relative w-1/2">
            <img
                className="w-full h-72 object-cover"
                src={`/storage/${bands[photos].main_photo}`}
                alt={bands[photos].name}
            />
            
            {/* Botón Izquierdo */}
            <button 
                type="button" 
                onClick={handlePreviousPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
                <ArrowLeft size={24} />
            </button>
            
            {/* Botón Derecho */}
            <button 
                type="button" 
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
                <ArrowRight size={24} />
            </button>
        </div>
    );
}