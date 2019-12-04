const express = require('express');
const login_controller = require('../controllers/loginController');
const router = express.Router();

// GET login page
router.get('/', login_controller.getLoginPage);

// POST request to login page. Authenticate user.
router.post('/', login_controller.loginUser);

module.exports = router;