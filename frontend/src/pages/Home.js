import React from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useEffect } from 'react';

//components
import RecipeDetails from '../components/RecipeDetails'
import { useAuthContext } from '../hooks/useAuthContext';


const Home = () => {
    const { recipes, dispatch } = useRecipesContext();
    const { user } = useAuthContext();

    useEffect(() => {

        // fetch recipes
        const fetchRecipes = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/recipe/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // uncomment for CORS
                    //'Origin': ''
                }
            });
            const json = await response.json();

            // send to context payload
            if (response.ok) {
                dispatch({type: 'SET_RECIPES', payload: json})
            }
        }
        if (user){
            fetchRecipes();
        }
           
    
    }, [dispatch, user])

      


  return (
    <div className='home'>
        <h1>Recipes</h1>
        <div className='recipes'>
            {recipes && recipes.map(recipe => (
                <RecipeDetails key={recipe._id} recipe={recipe} />
            ))}
        </div>
        
    </div>
  )
}

export default Home