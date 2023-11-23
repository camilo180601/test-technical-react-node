import { useState } from 'react'
import useForm from '../hooks/useForm'
import Global from '../helpers/Global';
import useAuth from '../hooks/useAuth';
import { Card, CardHeader, CardBody, Input, Checkbox } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const Login = () => {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_sended");
    const { setAuth }: any = useAuth();

    const loginUser = async (e: any) => {
        e.preventDefault();

        let userLogin = form;

        const request = await fetch(Global.url + 'user/login', {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await request.json();

        if (data.status === "success") {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setSaved("login");
            setAuth(data.user);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setSaved("error");
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="py-6 center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className='center mb-20'>
                        <span className='font-bold'>Log In</span>
                    </p>
                    <h1 className="content__title font-bold">MAYNOOTH</h1>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    {saved === "login" ?
                        <strong className='alert alert-success'>¡Usuario loggeado con exito!</strong>
                        : ''
                    }
                    {saved === "error" ?
                        <strong className='alert alert-danger'>¡Usuario NO se ha loggeado!</strong>
                        : ''
                    }
                    <form className='form-login' onSubmit={loginUser}>
                        <div className='form-login'>
                            <Input type='email' name='email' label="Email" placeholder='your@email.com' onChange={changed} />
                        </div>
                        <div className='form-login'>
                            <Input type='password' name='password' label="Password" placeholder='Your password' onChange={changed} />
                        </div>
                        <div className='form-login center'>
                            <Checkbox className='mr-3' >Remember me</Checkbox>
                            <a href='#'>Forgot Password?</a>
                        </div>
                        <div className='form-login center'>
                            <button type='submit' className='bg-black text-white pr-32 pl-32 hover:bg-gray-600'>
                                Log In
                            </button>
                        </div>
                        <div className='form-login center'>
                            <p>
                                Don't have an account? <Link to="/register" className='font-bold'> Sign up </Link>
                            </p>
                        </div>

                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login