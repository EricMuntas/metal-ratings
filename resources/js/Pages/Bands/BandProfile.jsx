import AppLayout from "../../Layouts/AppLayout";

export default function BandProfile({band}) {

    console.log(band);

    return (
        <AppLayout title={band.name}>
            <h1>{band.name}</h1>
            <p>
                Year formed: {band.formed_year}
            </p>
        </AppLayout>
    );
}