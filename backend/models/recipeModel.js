const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
    },
    amount: {
        type: String
    }
}, { _id: false })

const recipeSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    ingredients: [ingredientSchema],
    instructions: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

const recipe = mongoose.model('Recipe', recipeSchema);

module.exports = recipe;