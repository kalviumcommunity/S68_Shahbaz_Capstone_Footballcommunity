const express = require('express');
const { register, loginUser ,logoutUser} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.post('/Logout', logoutUser);

module.exports = router;