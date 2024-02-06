import { useState } from 'react'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (login, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch('/api/user/login', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password})
        })
        
        // json should be jwt
        const json = await response.json()

        if  (!response.ok) {
            setIsLoading(false);
            setError(json.error)
        }
        
        if (response.ok){
            //save token to local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false);
        }

    }
    return ({ login, isLoading, error })
}