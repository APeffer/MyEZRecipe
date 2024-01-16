const express = require('express');
const { createRecipe, getRecipe, getRecipes, deleteRecipe, } = require('../controllers/recipeController')

const router = express.Router();

// create recipe
router.post('/', createRecipe);

// get a single recipe
router.get('/:id', getRecipe);

// get all recipes
router.get('/', getRecipes);

// delete a single recipe
router.delete('/:id', deleteRecipe);

module.exports = router;