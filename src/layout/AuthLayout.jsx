import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <>
            <main className='container mx-auto md:grid grid-cols-2 items-center mt-32 gap-12 p-5'>
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout