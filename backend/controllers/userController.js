const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

const signupUser = async (req, res) => {

    // get data from the json request body
    const { email, username, password } = req.body;

    try {
        // create new user and push to database
        const newUser = await User.signup({ email, username, token})

        // create a token
        const token = jwt.sign(user._id)

        // respond with status and data
        res.status(200).json({email, username, token});

    } catch {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const { login, password } = req.body;
    let user;

    try{
        console.log(req.body)

        user = await User.login(login, password);
        res.setHeader('Access-Control-Allow-Origin', "https://my-ez-recipe-frontend.vercel.app")
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        //create a token
        const token = createToken(user._id);
        res.status(200).json({email:user.email, username: user.username, token});
    } catch(error){
        res.status(400).json({error: error.message})
    }
    

    
    
}



module.exports = {
    signupUser, 
    loginUser 
}