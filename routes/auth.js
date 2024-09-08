const express = require('express');
const { registerUser, loginUser, logout, resetPassword } = require('../controllers/authController');

const router =  express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/forget/password').post(resetPassword);

module.exports = router;