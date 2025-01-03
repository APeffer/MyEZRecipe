const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema( {
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    recipes: [{
        type: Schema.Types.ObjectID, ref: "Recipe"
    }]

})

// static signup method
userSchema.statics.signup = async function(newUserObject) {
    // validation
    if (!newUserObject.email || !newUserObject.username || !newUserObject.password) {
        console.log(`email: ${newUserObject.email}, username: ${newUserObject.username}, password: ${newUserObject.password}`);
        console.log(`typeof email: ${typeof newUserObject.email}, typeof username: ${typeof newUserObject.username}, typeof password: ${typeof newUserObject.password}`);

        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(newUserObject.email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(newUserObject.password)){
        throw Error('Password too weak');
    }

    const emailExists = await this.findOne({ email: newUserObject.email });
    const usernameExists = await this.findOne({ username: newUserObject.username });

    if(emailExists){
        throw Error('Email already in use');
    }

    if(usernameExists){
        throw Error('Username already in use');
    }

    const hash = await bcrypt.hash(newUserObject.password, 10);
    
    const user = await this.create({ ...newUserObject, password: hash})

    return user

}

userSchema.statics.login = async function(login, password) {
    console.log(login)
    if (!login || !password){
        throw Error('All fields must be filled');
    }

    let user;

    
    if (login.includes('@')){
        console.log('doing this')
        user = await this.findOne({ email: login })
        console.log('done doing this')
    }
    else{
        user = await this.findOne({ username: login });
    }

    if (!user) {
        throw Error('Incorrect login');
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);