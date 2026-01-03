import ReleasesTable from "../../Components/ReleasesTable";
import AppLayout from "../../Layouts/AppLayout";

export default function BandProfile({band, releases}) {

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

            <a href={'/bands/'+band.id+'/add-release'} className="link">Add release</a>

        <ReleasesTable releases={releases} band_id={band.id}/>

        </AppLayout>
    );
}