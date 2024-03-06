const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController')
const cors = require('cors')

const router = express.Router();


const corsOptions = {
    origin: 'https://my-ez-recipe-frontend.vercel.app', // Replace with your frontend domain
    methods: ['POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
    optionsSuccessStatus: 200 // Specify the success status for preflight requests
  };

router.options('/login', cors(corsOptions));

router.post('/signup', signupUser);

router.post('/login', loginUser);

module.exports = router;