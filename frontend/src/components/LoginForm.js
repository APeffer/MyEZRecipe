import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })
    const { login, isLoading, error } = useLogin();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        try{
            await login(formData)
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="login">Login:</label>
            <input type="text" id="login" onChange={handleChange} maxLength={16} required/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={handleChange} maxLength={32} minLength={8} required/>
            <button disabled={isLoading} type='submit'>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default LoginForm