import { useState } from 'react'
import useForm from '../hooks/useForm'
import Global from '../helpers/Global';
import { Card, CardHeader, CardBody, Input } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const Register = () => {

    const { form, changed } = useForm({});

    const [saved, setSaved] = useState("not sended");

    const saveUser = async (e: any) => {
        e.preventDefault();

        let newUser = form;

        const request = await fetch(Global.url + 'user/register', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setSaved("saved");
        } else {
            setSaved("error");
        }

    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="py-6 center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                    <p className='center'>
                        <span className='font-bold'>Register</span>
                    </p>
                    <h1 className="content__title font-bold mt-5">MAYNOOTH</h1>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    {saved === "saved" ?
                        <strong className='alert alert-success'>¡Usuario registrado con exito!</strong>
                        : ''
                    }
                    {saved === "error" ?
                        <strong className='alert alert-danger'>¡Usuario NO se ha registrado!</strong>
                        : ''
                    }
                    <form className='form-register' onSubmit={saveUser}>
                        <div className='form-register'>
                            <Input type='text' name='name' label="Name" placeholder="John" onChange={changed} />
                        </div>
                        <div className='form-register'>
                            <Input type='text' name='surname' label="Last Name" placeholder='Doe' onChange={changed} />
                        </div>
                        <div className='form-register'>
                            <Input type='text' name='nick' label="Nickname" placeholder='johndoe123' onChange={changed} />
                        </div>
                        <div className='form-register'>
                            <Input type='email' name='email' label="Email" placeholder='your@email.com' onChange={changed} />
                        </div>
                        <div className='form-register'>
                            <Input type='password' name='password' label="Password" placeholder='Your password' onChange={changed} />
                        </div>
                        <div className='form-register center'>
                            <button type='submit' className='bg-black text-white pr-32 pl-32 hover:bg-gray-600'>
                                Register
                            </button>
                        </div>
                        <div className='form-register center'>
                            <p>
                                You have an account? <Link to="/login" className='font-bold'> Log In </Link>
                            </p>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register