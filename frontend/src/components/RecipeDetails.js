import React from 'react';
import { useRecipesContext } from "../hooks/useRecipesContext";

const RecipeDetails = ({ recipe }) => {
    const { dispatch } = useRecipesContext();

    // function to add ingredient names and amounts to table
    const ingredientArr = () => {
      return recipe.ingredients.map((ingredient, index) => (
        <tr key={index}>
            <td className='ingredientName'>{ingredient.name}</td>
            <td className='ingredientAmount'>{ingredient.amount}</td>
        </tr>
      ));
    }

  return (
    <div className='recipe-details'>
        <h2>{recipe.title}</h2>
        <div className='ingredient'>
          <p><strong>Ingredients: </strong></p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {ingredientArr()}
            </tbody>
          </table>
        </div>
        <p className='instructions'><strong>Instructions: </strong>{recipe.instructions}</p>
    </div>
  )
}

export default RecipeDetails