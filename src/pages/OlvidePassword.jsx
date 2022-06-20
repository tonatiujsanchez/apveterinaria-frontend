import { useState } from 'react'
import { Link } from 'react-router-dom'

import Alerta from '../components/Alerta'
import SpinnerButton from '../components/SpinnerButton'
import clienteAxios from '../config/axios'


const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()

        if (email.trim() === '') {
            setAlerta({ error: true, msg: 'El correo es obligatorio' })
            return
        }

        const expRegular = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if (!expRegular.test(email)) {
            setAlerta({ error: true, msg: 'Por favor ingrese un correo válido' })
            return
        }

        setAlerta({})
        enviarCorreroRecuperacion(email)
    }


    const enviarCorreroRecuperacion = async (email) => {

        setCargando(true)

        try {
            const API_URL = '/veterinarios/olvide-password'
            const { data } = await clienteAxios.post(API_URL, {
                email
            })

            setAlerta({ error: false, msg: data.msg })
            setEmail('')
            setCargando(false)

        } catch (error) {

            const { data } = error.response
            setAlerta({ error: true, msg: data.msg })
            setCargando(false)
        }
    }



    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl max-w-[550px] ml-auto mb-12">
                    Recupera tu Acceso y <br />no Pierdas tus<br /><span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className='shadow-lg px-10 py-12 rounded-md bg-white md:max-w-[550px] relative'>
                {Object.keys(alerta).length > 0 &&
                    <div className="absolute top-[-32px] left-5 right-5">
                        <Alerta alerta={alerta} />
                    </div>
                }
                <form onSubmit={handleSubmit} className="">
                    <div className="my-5">
                        <label
                            htmlFor='email'
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="Ingresa tu email"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>
                    <button
                        type='submit'
                        disabled={cargando}
                        className='bg-indigo-700 text-white w-full py-3 rounded-lg font-bold uppercase mt-5 cursor-pointer hover:bg-indigo-800 disabled:bg-indigo-400'>
                        {!cargando ? "Enviar instrucciónes" : <SpinnerButton />}
                    </button>
                </form>

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
            </div>

        </>
    )
}

export default OlvidePassword