const mealModel = require('../models/mealModel');

function getNewMealPage(req, res) {
    const data = {
        page: 'newMeal'
    };

    res.render('index', data);
}

function getMealsPage(req, res) {
    const data = {
        page: 'meal'
    }
    res.render('index', data);
}

function getMealsList(req, res) {
    const userId = req.params.userId;
    const meals = mealModel.getMealsList(userId);
    res.send(meals);
}

module.exports = {
    getNewMealPage,
    getMealsPage,
    getMealsList
};