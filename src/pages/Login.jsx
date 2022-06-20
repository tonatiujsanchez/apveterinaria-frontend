
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl max-w-[500px] ml-auto mb-12">
                    Inicia Sesión y <br />Adminstra tus <br /><span className="text-black">Pacientes</span>
                </h1>
            </div>
            <div className='shadow-lg px-10 py-12 rounded-md bg-white md:max-w-[550px]'>
                <form className="">
                    <div className="my-5">
                        <label
                            htmlFor='email' 
                            className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id='email'
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
                            placeholder="Ingresa tu password"
                            className="border w-full p-3 mt-2 bg-gray-50 rounded-xl" />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesión"
                        className="bg-indigo-700 text-white w-full py-3 rounded-lg font-bold uppercase mt-5 cursor-pointer hover:bg-indigo-800" />
                </form>

                <nav className="mt-5 md:max-w-[500px] lg:flex lg:justify-between">
                    <Link 
                        to="/registrar"
                        className='block my-5 text-center text-gray-500 hover:text-gray-800 hover:underline'>
                            ¿No tienes cuenta? Regístrate
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

export default Login