import { useState } from 'react'

const useForm = (initialObj = {}) => {
    
    const [form, setForm] = useState(initialObj);

    const changed = ({target} : any) => {
        const {name, value} = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    return {
        form, 
        changed
    };
}

export default useForm