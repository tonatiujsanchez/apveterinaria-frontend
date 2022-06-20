import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/axios"

import { useForm } from "../hooks/useForm"

import Alerta from "../components/Alerta"
import SpinnerButton from "../components/SpinnerButton"


const NuevoPassword = () => {

    const { token } = useParams()
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [cargando, setCargando] = useState(false)

    const { valores, setOnchangeValores, resetarFormulario } = useForm({
        password: '',
        password2: ''
    })



    useEffect(() => {
        const validarToken = async () => {
            try {
                const URL_API = `/veterinarios/olvide-password/${token}`
                await clienteAxios(URL_API)

                setTokenValido(true)
                setAlerta({ error: false, msg: 'Ingresa tu nuevo password' })

                setTimeout(() => {
                    setAlerta({})    
                }, 2000);

            } catch (error) {
                setTokenValido(false)
                setAlerta({ error: true, msg: 'Enlace no valido' })
            }
        }
        validarToken()


    }, [])


    const handlleSubmit = (e) => {
        e.preventDefault()


        if(valores.password !== valores.password2){
            setAlerta( {error: true, msg: 'Los password no coinsiden'} )
            return
        }

        if(valores.password.length < 6){
            setAlerta( {error: true, msg: 'El password es muy corto, se requiere minimo 6 caracteres'} )
            return
        }

        setAlerta({})
        restablecerPassword(valores.password)
    }


    const restablecerPassword = async(password) => {

        setCargando(true)

        try {    
            const URL_API = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(URL_API, {password})
            setAlerta( {error: false, msg: data.msg} )
            setCargando(false)
            resetarFormulario()
            setTokenValido(false)


        } catch (error) {
            setAlerta( {error: true, msg: 'Hubo un error'} )
            setCargando(false)
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl max-w-[550px] ml-auto mb-12">
                    Restablece tu password<br /> y no Pierdas acceso<br /><span className="text-black">a tus Pacientes</span>
                </h1>
            </div>
            <div className='shadow-lg px-10 py-12 rounded-md bg-white md:max-w-[550px] relative'>
                {tokenValido
                    ? <>
                        {Object.keys(alerta).length > 0 &&
                            <div className="absolute top-[-32px] left-5 right-5">
                                <Alerta alerta={alerta} />
                            </div>
                        }
                        <form onSubmit={handlleSubmit} className="">
                            <div className="my-5">
                                <label
                                    htmlFor='password'
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id='password'
                                    name='password'
                                    value={valores.password}
                                    onChange={setOnchangeValores}
                                    placeholder="Nuevo password"
                                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                            </div>
                            <div className="my-5">
                                <label
                                    htmlFor='password2'
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                    Repite password
                                </label>
                                <input
                                    type="password"
                                    id='password2'
                                    name='password2'
                                    value={valores.password2}
                                    onChange={setOnchangeValores}
                                    placeholder="Confirma nuevo password"
                                    className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                            </div>
                            <button
                                type='submit'
                                disabled={cargando}
                                className='bg-indigo-700 text-white w-full py-3 rounded-lg font-bold uppercase mt-5 cursor-pointer hover:bg-indigo-800 disabled:bg-indigo-400'>
                                {!cargando ? "Guardar nuevo password" : <SpinnerButton />}
                            </button>
                        </form>
                    </>
                    : Object.keys(alerta).length > 0 &&
                    <>
                        <div className="mb-10">
                            <Alerta alerta={alerta} />
                        </div>
                        <nav className="mt-5 md:max-w-[500px] lg:flex lg:justify-center">
                            <Link
                                to="/"
                                className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                                Iniciar Sesión
                            </Link>
                        </nav>
                    </>
                }
            </div>

        </>
    )
}

export default NuevoPassword