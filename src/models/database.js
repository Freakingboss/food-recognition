var mysql = require('mysql');

var connection = mysql.createConnection({
    // host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodrecognitionwebapp'
});

connection.connect();

// Get the components of a food and resolves it
function queryFoodComposition(food) {

    return new Promise((resolve, reject) => {
        let sql = 'SELECT `food_id`, `food_name`, `kcal`, `protein`, `carbohydrate`, `fiber` FROM `food` WHERE `food_name` LIKE ?"%"';
        connection.query(sql, [food.className], function(err, results, fields) {
            // connection.end();
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    queryFoodComposition
}