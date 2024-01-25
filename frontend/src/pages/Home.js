import React from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext';
import { useEffect } from 'react';

//components
import RecipeDetails from '../components/RecipeDetails'

const Home = () => {
    const { recipes, dispatch } = useRecipesContext();

    useEffect(() => {

        // fetch recipes
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipe/');
            const json = await response.json();

            // send to context payload
            if (response.ok) {
                dispatch({type: 'SET_RECIPES', payload: json})
            }
        }

        fetchRecipes();    
    
    }, [dispatch])

      


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