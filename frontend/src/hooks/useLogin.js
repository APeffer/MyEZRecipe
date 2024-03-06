import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading as false
    const { dispatch } = useAuthContext();

    const login = async (loginCredentials, password) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch('https://my-ez-recipe-api.vercel.app/api/user/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Origin': 'https://my-ez-recipe-frontend.vercel.app'
                },
                body: JSON.stringify({ login: loginCredentials, password })
            });

            if (!response.ok) {
                const json = await response.json(); // Parse the error message
                setIsLoading(false);
                setError(json.error); // Set error message
                return; // Exit the function early
            }

            // If response status is ok, continue processing
            const json = await response.json(); // Parse the JSON response
            localStorage.setItem('user', JSON.stringify(json)); // Save token to local storage
            dispatch({ type: 'LOGIN', payload: json }); // Dispatch login action
        } catch (error) {
            setIsLoading(false);
            setError('An error occurred while processing the response.'); // Set a generic error message
        }
    };

    return { login, isLoading, error };
};