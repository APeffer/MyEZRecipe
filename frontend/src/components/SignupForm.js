import React from 'react'
import { useState } from 'react'
import { useSignup } from "../hooks/useSignup";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`email: ${email} , username: ${username} , password: ${password} , `)
        await signup(email, username, password);
    }

  return (
    <form className='signup-form' method='POST' onSubmit={handleSubmit}>

        <label>Email:</label>
        <input 
            type='email'
            id='email'
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
         />

        <label>Username:</label>
        <input 
            type='text' 
            id='username' 
            placeholder=""
            maxLength='16' 
            onChange={(e) => setUsername(e.target.value)}
            required 
        />

        <label>Password:</label>
        <input 
            type='password' 
            id='password' 
            placeholder=""
            maxLength="32"
            minLength={8} 
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <button disabled={isLoading}>Sign Up</button>
        {error && <div className="error">{error}</div>}

    </form>
  )
}

export default SignupForm