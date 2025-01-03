const { default: mongoose } = require('mongoose');
const Recipe = require('../models/recipeModel')

// create a new recipe
const createRecipe = async (req, res) => {
    const { title, description, ingredients, directions, author } = req.body;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // try to add to database
    try {
        const recipe = await Recipe.create({ title, description, ingredients, directions, author })
        res.status(200).json(recipe);
        console.log(JSON.stringify(recipe));
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// get a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe exists'})
    }
    const recipe = await Recipe.findById(id);

    res.status(200).json(recipe);

}

// get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find().sort({title: 1});
    res.status(200).json(recipes);
}

// delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such recipe exists"})
    }

    const recipe = await Recipe.findByIdAndDelete(id);
    res.status(200).json(recipe);
}

module.exports = {
    createRecipe,
    getRecipe,
    getRecipes,
    deleteRecipe,
}