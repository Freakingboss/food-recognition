const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3005;

// Get the routes
const home = require('./routes/home');
const meal = require('./routes/meal');

app.use(express.static(path.join(__dirname,'./assets')));

// Set ups
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Config
// app.use(compression());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Use the routes
app.use('/', home);
app.use('/login', home);
// 
//app.use('/show-all-meals', meal);

//app.use('/meal', meal)
// Define the port that the server will listen
app.listen(port, function () {
    console.log(`Model server running on http://localhost:${port}`);
});

module.exports = app;