const express = require('express');
const meal_controller = require('../controllers/mealController');
const router = express.Router();

// Get a single food composition
router.get('/get-food-composition?', meal_controller.getFoodComposition);

// GET a list of the most recent meals
router.get('/:userId/meals-list', meal_controller.getMealsList);

// GET new meal page
router.get('/newMeal', meal_controller.getNewMealPage);

// GET meal page
router.get('/:userId', meal_controller.getMealsPage);

// GET request to edit a meal
// router.get('/:mealId/edit', meal_controller.getEditMealPage);

// POST request to send the edited meal
// router.post('/:mealId/update', meal_controller.updateMeal);

// GET a new meal page
// router.get('/new', meal_controller.createMeal);

module.exports = router;