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

    // createMeal() {
    //     this.myMeal.meal.dateTime = new Date();
    // }

    // editMealName(mealName) {
    //     this.myMeal.meal.mealName = mealName;
    // }

    mealSucessMessage() {
        console.log("Objeto refeição criado com sucesso!");
    }

    addFood(food) {
        let predictedFood = this.getFoodWithHighestProbability(food);

        // Get food info in the food table
        // let foodInfo = await getFoodInfo('/get-food-info', predictedFood.className,);

        // Add food to the meal
        this.myMeal.food.push({
            foodId: food.foodId,
            foodName: food.foodName,
            kcal: food.kcal
        });

        return;
    }

    async getFoodInfo(url, data) {
        let postOptions = {
            method: 'POST',
            mode: 'CORS',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            referrer: 'no-referrer',
            body: JSON.stringify(data)
        }
        try {
        let foodInfo = await fetch(url, postOptions);
        console.log('Sucesso: ', JSON.stringify(foodInfo));
        } catch (error) {
            console.log('Error:',  error);
        }
        return await foodInfo.json();
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

let myNewMeal = new Meal();
myNewMeal.mealSucessMessage();