import { Link } from "@inertiajs/react";
import { Star } from "lucide-react"
import { useState } from "react";

export default function GridItem({ item, type }) {

    console.log(item)
    const mainPhoto = item.main_photo ?? item.release?.main_photo ?? null;

    let link = '';
    switch (type) {
        case 'band':
            link = '/bands/' + item.id;
            break;
        case 'release':
            link = '/songs/' + item.release?.id + '/reviews';
            break;
        default:
            break;
    }

    return (
        <>
            {/* href={'/songs/' + item.release.id + '/reviews'} */}
            <Link href={link}>
                <div className="flex flex-col justify-center items-center gap-1">


                    {
                        (mainPhoto) ? (
                            <>
                                {/* todo -> add image */}
                                <img src={`/storage/${mainPhoto}`} alt="" className="bg-gray-200 h-32 w-32" draggable="false" />
                            </>
                        ) : (
                            <>
                                <div id="img" className="bg-gray-200 h-32 w-32 flex justify-center items-center">
                                    <span className="text-white text-8xl select-none text-center">?</span>
                                </div>
                            </>
                        )
                    }
                    <span className="font-bold">{item.release?.bands?.[0]?.name ?? item.bands?.[0]?.name ?? item.name ?? 'Unknown'}</span>
                    <span>{item.release?.name ?? item.formed_year ?? 'Unknown'}</span>
                    {
                        item.rating ? (
                            <span className="flex justify-center items-center">
                                {item.rating}
                                <Star className="w-8" fill="yellow" stroke="yellow" width={20} height={20} />
                            </span>
                        ) : (
                            <span className="flex justify-center items-center">
                                No rating yet
                            </span>
                        )
                    }

                </div>
            </Link>
        </>
    )


}