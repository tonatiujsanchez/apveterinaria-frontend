import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"



const AdminLayout = () => {

    const { auth, cargando } = useAuth()

    if(cargando){
        return(
            <h3>Cargando....</h3>
        )
    }

    return (
        <>
            {auth?._id
                ?
                <>
                    <h1>AdminLayout</h1>
                    <Outlet />
                </>
                : <Navigate to="/" />

            }
        </>
    )
}

export default AdminLayout