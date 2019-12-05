const login_model = require('../models/authentication');

function getHomePage (req, res) {
    console.log('HOME');
    let data = {
        page: 'home'
    };

    res.render('index', data);
}

function loginUser(req, res) {
    console.log('LOGIN')
    let userCredentials = {};

    if(Object.entries(req.body).length !== 0) {
        userCredentials.username = req.body.username;
        userCredentials.password = req.body.password;
        console.log(userCredentials.username);
        console.log(userCredentials.password);
        if (login_model.authenticateUser(userCredentials) || (userCredentials.username === "" || userCredentials.password === "")) {
            res.redirect(302, '/');
        }
    } else {
        res.send("Preencha os campos do formulário");
    }

}

module.exports = {
    getHomePage,
    loginUser
};
