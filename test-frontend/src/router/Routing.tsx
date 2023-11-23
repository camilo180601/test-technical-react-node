import AuthProvider from '../components/context/AuthProvider'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import PublicLayout from '../components/layout/public/PublicLayout'
import Feed from '../components/product/Feed'
import ProductDetail from '../components/product/ProductDetail'
import Login from '../components/user/Login'
import Logout from '../components/user/Logout'
import Register from '../components/user/Register'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'

const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                    <Route path='/products' element={<PrivateLayout />} >
                        <Route index element={<Feed />} />
                        <Route path='logout' element={<Logout />} />
                        <Route path='feed' element={<Feed />} />
                        <Route path='detail/:index' element={<ProductDetail />} />
                    </Route>
                    <Route path='*' element={
                        <>
                            <p>
                                <h1>Error pagina no encontrada</h1>
                                <Link to="/">Volver al Inicio</Link>
                            </p>
                        </>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routing