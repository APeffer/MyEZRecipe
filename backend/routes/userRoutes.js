const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController')
import allowCors from '../middleware/allowCors';


const router = express.Router();

router.post('/signup', allowCors(signupUser));

router.post('/login', allowCors(loginUser));

module.exports = router;