const express = require('express');
const { createRecipe, getRecipe, getRecipes, deleteRecipe, } = require('../controllers/recipeController')
import allowCors from '../middleware/allowCors';

const router = express.Router();

// create recipe
router.post('/', allowCors(createRecipe));

// get a single recipe
router.get('/:id', allowCors(getRecipe));

// get all recipes
router.get('/', allowCors(getRecipes));

// delete a single recipe
router.delete('/:id', allowCors(deleteRecipe));

module.exports = router;