
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import Alerta from '../components/Alerta'
import SpinnerButton from '../components/SpinnerButton'
import clienteAxios from '../config/axios'


const Registrar = () => {

    const { valores, setOnchangeValores, resetarFormulario } = useForm({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    })

    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)

    const handleSubmit = ( e ) =>{
        e.preventDefault()

        if(Object.values(valores).includes('')){
            setAlerta( {error: true, msg: 'Todos los campos son obligatorios'} )
            return
        }

        const expRegular = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(!expRegular.test(valores.email)){
            setAlerta( {error: true, msg: 'Por favor ingrese un correo válido'} )
            return
        }

        if(valores.password !== valores.password2){
            setAlerta( {error: true, msg: 'Los password no coinsiden'} )
            return
        }

        if(valores.password.length < 6){
            setAlerta( {error: true, msg: 'El password es muy corto, se requiere minimo 6 caracteres'} )
            return
        }

        setAlerta( {} )
        registrarVeterinario({ 
            nombre: valores.nombre, 
            email: valores.email, 
            password: valores.password
        })
    }

    const registrarVeterinario = async( veterinario ) => {

        setCargando(true)

        try {

            const API_URL = '/veterinarios' 
            await clienteAxios.post(API_URL, veterinario)

            setAlerta( {error: false, msg: 'Cuenta creada correctamente, revisa tu email'} )
            resetarFormulario()
            setCargando(false)
        } catch (error) {
            const { data } = error.response
            setAlerta( {error: true, msg: data.msg} )
            setCargando(false)
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl max-w-[550px] ml-auto mb-12 md:mb-20">
                    Crea tu Cuenta y <br />Adminstra tus <br /><span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className='shadow-lg px-10 py-12 rounded-md bg-white md:max-w-[550px] relative'>
                {Object.keys(alerta).length > 0 &&
                    <div className="absolute top-[-32px] left-5 right-5">
                        <Alerta alerta={alerta}/>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            htmlFor='nombre' 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id='nombre'
                            name='nombre'
                            value={valores.nombre}
                            onChange={setOnchangeValores}
                            placeholder="Ingresa tu Nombre"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>

                    <div className="my-5">
                        <label
                            htmlFor='email'
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={valores.email}
                            onChange={setOnchangeValores}
                            placeholder="Ingresa tu email"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>
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
                            placeholder="Ingresa tu password"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="my-5">
                        <label
                            htmlFor='password2' 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input
                            type="password"
                            id='password2'
                            name='password2'
                            value={valores.password2}
                            onChange={setOnchangeValores}
                            placeholder="Repite tu password"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>
                    <button
                        type='submit'
                        disabled={cargando} 
                        className='bg-indigo-700 text-white w-full py-3 rounded-lg font-bold uppercase mt-5 cursor-pointer hover:bg-indigo-800 disabled:bg-indigo-400'>
                        { !cargando ? "Crear Cuenta" : <SpinnerButton />}
                    </button>
                </form>

                <nav className="mt-5 md:max-w-[500px] lg:flex lg:justify-between">
                    <Link
                        to="/"
                        className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                    <Link
                        to="/olvide-password"
                        className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                        Olvidé mi contraseña
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar