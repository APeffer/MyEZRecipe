import React from 'react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const LoginForm = () => {
    const [loginCredentials, setLoginCredentials] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(loginCredentials, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Login:</label>
            <input 
            type="text" 
            value={loginCredentials} 
            onChange={(e)=> setLoginCredentials(e.target.value)} 
            required/>

            <label>Password:</label>
            <input 
            type="password" 
            value={password} 
            onChange={(e)=> setPassword(e.target.value)} 
            maxLength={32} 
            minLength={8} 
            required/>

            <button disabled={isLoading} type='submit'>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default LoginForm