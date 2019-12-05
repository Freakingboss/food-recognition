class Meal {
    constructor(mealObj) {
        this.myMeal = {
            userId: null,
            meal: {
                mealId: null,
                dateTime: '',
                mealName: '',
                totalKcal: 0
            },
            food: [
                {
                    foodId: '',
                    foodName: '',
                    kcal: ''
                }
            ]
        };
    }

    createMeal() {
        this.myMeal.meal.dateTime = new Date();
    }

    // editMealName(mealName) {
    //     this.myMeal.meal.mealName = mealName;
    // }

    mealSucessMessage() {
        console.log("Objeto refeição criado com sucesso!");
    }

    addFood(food) {
        let predictedFood = this.getFoodWithHighestProbability(food);

        // Get food info in the food table
        // let foodInfo = await getFoodComposition('/get-food-info', predictedFood.className,);

        // Add food to the meal
        this.myMeal.food.push({
            foodId: food.foodId,
            foodName: food.foodName,
            kcal: food.kcal
        });

        return;
    }

    async getFoodComposition(url) {
        let foodInfo = null;
        let postOptions = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'omit'
        }

        try {
            let response = await fetch(url, postOptions);
            foodInfo = await response.json();
            console.log(foodInfo);
        } catch (error) {
            throw new Error ('Mensagem de erro: ', error);
        }
        return foodInfo;
    }

    getFoodWithHighestProbability(predictions) {
        let prob;
        let highestProb = -1;
        let highestPrediction;
        predictions.forEach((prediction, index) => {
            prob = prediction.probability;
            if (prob > highestProb) {
                highestProb = prob;
                highestPrediction = prediction;
            };
        });
        return highestPrediction;
    }

}