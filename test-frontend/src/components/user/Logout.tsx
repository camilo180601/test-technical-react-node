import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = () => {

    const { setAuth } : any = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        setAuth({});
        navigate("/login");
    });
    return (
        <div>Log Out</div>
    )
}

export default Logout