import AppLayout from "../../Layouts/AppLayout";
import BandsTable from "../../Components/BandsTable";
import Filter from "../../Components/Filter";

export default function SearchBand({ genres, bands }) {

    return (

        <>
            <AppLayout title="Search Band">

                <h1>Searching</h1>

                <Filter genres={genres}></Filter>
                <BandsTable bands={bands} />

            </AppLayout>


        </>

    )
}