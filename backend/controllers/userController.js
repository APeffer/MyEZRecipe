const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const user = require('../models/userModel');


const createUser = async (req, res) => {
    
    try {
        // get data from the json request body
        const { email, username, password } = req.body;

        // check for any fields left empty
        let emptyFields = [];
        if(!email){
            emptyFields.push('email');
        }
        if(!username){
            emptyFields.push('username');
        }
        if(!password){
            emptyFields.push('password');
        }
        if(emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
        }

        // hash password before saving to database // 10 salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user and push to database
        const newUser = await User.create({ email, username, password: hashedPassword})

        // create a token
        const token = jwt.sign(newUser, process.env.JWT_SECRET)

        // respond with status and data
        res.status(200).json(token);
        console.log(JSON.stringify(newUser));

    } catch {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const { login, password } = req.body;

    try{
        // find using email
        if (req.body.login.includes('@')){
            const user = await User.findOne({email: login});
        }
        //find using username
        else{
            const user = await User.findOne({username: login});
        }

        //compare password from form with stored user hashed password
        bcrypt.compare(password, user.password, (err, result) =>{
            if (err){
                console.log(err);
            }
            else if(result){
                //passwords match
                const token = jwt.sign(user, process.env.JWT_SECRET)
                console.log('passwords match, attempting to respond with json token');
                res.status(200).json({token});
            }
            else{
                //passwords don't match
                res.status(404).json({message: 'Invalid password'})
                console.log("passwords don't match");
            }
        })

    } catch(error){
        res.status(400).json({error: error.message})
    }
    

    
    
}



module.exports = { createUser, loginUser }