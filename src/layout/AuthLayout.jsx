import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <>
            <h1>Administrador de Pacientes Veterinario</h1>
            <Outlet />
        </>
    )
}

export default AuthLayout