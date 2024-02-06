const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const schema = mongoose.Schema;

const userSchema = new schema( {
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
    }
})

// static signup method
userSchema.statics.signup = async function(email, username, password) {
    // validation
    if (!email || !username || !password) {
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password too weak');
    }

    const exists = await this.findOne({ email });

    if(exists){
        throw Error('Email already in use');
    }

    const hash = await bcrypt.hash(password, 10);
    
    const user = await this.create({ email, username, password: hash})

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