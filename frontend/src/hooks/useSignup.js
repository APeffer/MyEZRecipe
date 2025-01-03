import { useState } from "react";
import  { useAuthContext }  from "../hooks/useAuthContext"



export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const signup = async (email, username, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': `${process.env.REACT_APP_DOMAIN}`
            },
            body: JSON.stringify({email, username, password})
        });
        
        //json should be jwt
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the token to local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
        }

    }
    return { signup, isLoading, error}
}