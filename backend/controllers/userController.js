const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')


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

        // respond with status and data
        res.status(200).json(newUser);
        console.log(JSON.stringify(newUser));

    } catch {
        res.status(400).json({error: error.message})
    }
}



module.exports = { createUser }