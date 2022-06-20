import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const ConfirmarCuenta = () => {

    const { id } = useParams()
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
        const confirmaCuenta = async () => {
            try {
                const API_URL = `/veterinarios/confirmar/${id}`
                const { data } = await clienteAxios(API_URL)
                setAlerta({ error: false, msg: data.msg })
                console.log(data);
            } catch (error) {
                const { data } = error.response
                setAlerta({ error: true, msg: data.msg })
            }
        }
        confirmaCuenta()
    }, [])

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl max-w-[550px] ml-auto mb-12 md:mb-20">
                    Confirma tu Cuenta y <br />Comienza a Administrar<br /><span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className='shadow-lg px-10 py-12 rounded-md bg-white md:max-w-[550px] relative'>
                {Object.keys(alerta).length > 0 &&
                    <>
                        <div className="mb-10">
                            <Alerta alerta={alerta} />
                        </div>
                        {
                            !alerta.error
                                ? <Link
                                    to="/"
                                    className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                                    Iniciar Sesión
                                </Link>
                                :
                                <nav className="mt-5 md:max-w-[500px] lg:flex lg:justify-between">
                                    <Link
                                        to="/"
                                        className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        to="/registrar"
                                        className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                                        ¿No tienes cuenta? Regístrate
                                    </Link>
                                </nav>
                        }
                    </>
                }
            </div>
        </>
    )
}

export default ConfirmarCuenta