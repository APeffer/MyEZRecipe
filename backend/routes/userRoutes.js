const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController')



const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', cors({
    origin: 'https://my-ez-recipe-frontend.vercel.app/login'
}), loginUser);

module.exports = router;