export default function ReleasesTable({ releases }) {


    function getYear(release_date) {
        return release_date.split('-')[0];
    }

    return (
        <>
            <h1 className="flex justify-center text-2xl">Releases</h1>
            <div className="border rounded-xl m-8 p-2 border-black">
                <div className="grid grid-cols-8 bg-gray-100">
                    <span className="col-span-4">
                        Name
                    </span>
                    <span className="col-span-2">Type</span>
                    <span className="col-span-1">Release</span>
                    <span className="col-span-1">Rating</span>
                </div>
                {
                    releases.map((release, index) => (
                        <div className="grid grid-cols-8" key={release.id}>
                            <span className="col-span-4">
                                {release.name}
                            </span>
                            <span className="col-span-2"> {release.type}</span>
                            <span className="col-span-1"> {getYear(release.release_date)}</span>
                            <span className="col-span-1">0</span>
                        </div>
                    ))
                }
            </div>
        </>
    );

}