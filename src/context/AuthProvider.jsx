import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

const KEY_STORAGE = 'AP_Veterianria_XmwTbAQmE27eQOeSa802'

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)


    const autenticarUsuario = async() => {

        const token = localStorage.getItem(KEY_STORAGE)

        if( !token ){
                setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const API_URL = '/veterinarios/perfil' 
            const { data } = await clienteAxios(API_URL, config)
            setAuth(data)
            setCargando(false)
        } catch (error) {
            setAuth({})
            setCargando(false)
        }
    }

    useEffect(()=>{
        autenticarUsuario()
    },[])



    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                autenticarUsuario
            }} >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext
