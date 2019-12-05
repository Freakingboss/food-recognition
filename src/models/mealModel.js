const database = require('./database');

function getMealsList(userId) {
    const meals = [];
    let message = "No meal yet!";
    return;
}

async function queryFoodComposition(predictedFood){
    let result;
    try {
        result = await database.queryFoodComposition(predictedFood);
    } catch (error) {
        throw new Error('Erro na query composição do alimento.');
    }
    return result;
}

module.exports = {
    getMealsList,
    queryFoodComposition
};