import React, { useState } from 'react';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [directions, setDirections] = useState('');

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  // Handle Submit on Create Recipe form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = { title, description, ingredients, directions };
    console.log('Recipe submitted:', JSON.stringify(recipe));
    // Replace console.log with a fetch/axios POST request to your backend.

    try{
      // get username for author
      const sessionData = JSON.parse(localStorage.getItem("user"));
      const username = sessionData?.username;

      // post recipe to database
      const recipeResponse = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/recipe`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Origin': `${process.env.REACT_APP_DOMAIN}`
        },
        body: JSON.stringify({...recipe, author: username})
      });

      if (!recipeResponse.ok) {
        console.log(`Error adding recipe`)
        const json = await recipeResponse.json();
        console.log(JSON.stringify(json))
      }

      const userResponse = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/user/addrecipe`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Add this header
        },
        body: JSON.stringify({ recipeResponse })
      })

      if (!userResponse.ok) {
        console.log(`Error adding recipe to user`)
        const json = await userResponse.json();
        console.log(JSON.stringify(json))
      }
        
    } catch (error) {
      console.error(`Error in RecipeForm: ${error}`)
    }
    

  };

  return (
    <div className='recipeFormContainer'>
      <h1>Create a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className='title'>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='description'>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='ingredients'>
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div className='ingredientContainer' key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                required
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" id="btn_addIngredient" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className='directions'>
          <label>Directions</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
