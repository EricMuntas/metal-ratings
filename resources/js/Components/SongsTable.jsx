import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function SongsTable({ songs, onWriteReview }) {
    return (
        <>
            <h1 className="flex justify-center text-2xl">Songs</h1>

            <div className="border rounded-xl m-8 p-2 border-black">
                <div className="grid grid-cols-5 bg-gray-100">
                    <span className="col-span-2">Title</span>
                    <span className="col-span-1">Duration</span>
                    <span className="col-span-1">Rating</span>
                    <span className="col-span-1"></span>
                </div>
                {songs.map((song) => (
                    <div className="grid grid-cols-5" key={song.id}>
                        <span className="col-span-2">
                            <Link className="link" href={"/songs/" + song.id}>
                                {song.title}
                            </Link>
                        </span>
                        <span className="col-span-1">{song.duration}</span>
                        <span className="col-span-1">
                            {song.rating ?? "No rating yet"}
                        </span>
                        <span className="col-span-1">
                            <Star 
                                className="cursor-pointer" 
                                onClick={() => onWriteReview(song)} 
                            />
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}