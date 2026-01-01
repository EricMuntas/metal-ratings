import AppLayout from "../Layouts/AppLayout";

export default function Welcome({ name }) {
    return (
        <AppLayout title="Home">
            <h1>¡Hola {name}!</h1>
            <p>Laravel + React + Inertia funcionando y tailwind</p>
        </AppLayout>
    );
}   