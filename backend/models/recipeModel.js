const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const ingredientSchema = new Schema({
//     ingredient: {
//         type: String,
//     }
// }, { _id: false })

const recipeSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

const recipe = mongoose.model('Recipe', recipeSchema);

module.exports = recipe;