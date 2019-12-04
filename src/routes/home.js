const express = require('express');
const router = express.Router();
const home_controller = require('../controllers/homeController.js');

// GET request for the home page
router.get('/', home_controller.getHomePage);

// Export the router object
module.exports = router;