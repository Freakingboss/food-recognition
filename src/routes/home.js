const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/homeController.js');

console.log('hehe')
// GET request for the home page
router.get('/', home_controller.getHomePage);

// POST request to login page. Authenticate user.
router.post('/login', home_controller.loginUser);

// Export the router object
module.exports = router;