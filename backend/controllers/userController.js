const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');



const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

const signupUser = async (req, res) => {

    // get data from the json request body
    const { email, username, password } = req.body;
    //console.log(`Email: ${email}, username: ${username}, password: ${password}, `)

    try {
        // create new user and push to database
        const newUser = await User.signup({ email, username, password})

        // create a token
        const token = createToken(newUser._id)
        
        // respond with status and data
        res.status(200).json({email, username, token});
    } catch (error) {
        console.error("Error in signupUser:", error.message);
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const { login, password } = req.body;
    let user;

    try{
        console.log(req.body)

        user = await User.login(login, password);

        //create a token
        const token = createToken(user._id);
        res.status(200).json({email:user.email, username: user.username, token});
    } catch(error){
        res.status(400).json({error: error.message})
    }
    
}

const addRecipeToUser = async (req, res) => {
    const recipe = req.body.recipeResponse; // Extract recipe data from the request body
  
    try {
      // Find the user by username
      let user = await User.findOne({ username: recipe.author });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // If the user exists, add the recipe to their recipes array
      user.recipes.push(recipe);
  
      // Save the updated user document
      await user.save();
  
      // Respond with the updated user
      res.status(200).json(user);
    } catch (error) {
      console.error("Error in addRecipeToUser:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };



module.exports = {
    signupUser, 
    loginUser,
    addRecipeToUser
}