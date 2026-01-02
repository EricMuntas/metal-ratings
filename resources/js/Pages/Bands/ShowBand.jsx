import AppLayout from "../../Layouts/AppLayout";

export default function BandProfile({band, releases}) {


    // console.log(band);
    console.log(releases);

    return (
        <AppLayout title={band.name}>
            <h1>{band.name}</h1>
            <p>
                Year formed: {band.formed_year}
            </p>

        {releases.map((release, index) => (
            <h1>
                {release.name}
            </h1>
        ))}

            <a href={'/bands/'+band.id+'/add-release'} className="text-blue-500 underline">Add release</a>
        </AppLayout>
    );
}