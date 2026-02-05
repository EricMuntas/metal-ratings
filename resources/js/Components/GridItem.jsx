import { Star } from "lucide-react"

export default function GridItem({ release }) {

    console.log(release)

    const mainPhoto = (release.main_photo || release.release.main_photo) ?? null;


    return (
        <>

            <div className="flex flex-col justify-center items-center gap-1">


                {
                    (mainPhoto) ? (
                        <>
                        {/* todo -> add image */}
                            <img src={`/storage/${mainPhoto}`} alt="" className="bg-gray-200 h-32 w-32"  draggable="false" />
                        </>
                    ) : (
                        <>
                            <div id="img" className="bg-gray-200 h-32 w-32 flex justify-center items-center">
                                <span className="text-white text-8xl select-none text-center">?</span>
                            </div>
                        </>
                    )
                }
                <span className="font-bold">{(release.release.bands[0].name || release.bands[0].name) ?? 'Unknown'}</span>
                <span>{(release.release.name || release.name) ?? 'Unknown'}</span>
                <span className="flex justify-center items-center ">{release.rating ?? 'Unknown'}
                <Star className="w-8" fill="yellow" stroke="yellow" width={20} height={20}/>

                </span>
            </div>

        </>
    )


}