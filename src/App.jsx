import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AuthProvider } from "./context/AuthProvider"

import AuthLayout from "./layout/AuthLayout"
import AdminLayout from "./layout/AdminLayout"

import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePassword from "./pages/OlvidePassword"
import NuevoPassword from "./pages/NuevoPassword"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"

import Dashboard from "./pages/Dashboard"




const App = () => {


    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="registrar" element={<Registrar />} />
                        <Route path="olvide-password" element={<OlvidePassword />} />
                        <Route path="olvide-password/:token" element={<NuevoPassword />} />
                        <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
                    </Route>
                    {/* Rutas privadas */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                    </Route>

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
