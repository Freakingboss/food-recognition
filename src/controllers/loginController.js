const login_model = require('../models/authentication');

function getLoginPage(req, res) {
    let data = {
        page: 'login'
    }

    res.render('index', data);
}

function loginUser(req, res) {
    let userCredentials = {};

    if(Object.entries(req.body).length !== 0) {
        userCredentials.username = req.body.username;
        console.log(userCredentials.username);
        if (login_model.authenticateUser(userCredentials)) {
            res.redirect(302, '/');
        }
    } else {
        res.send("Preencha os campos do formulário");
    }

}

module.exports = {
    getLoginPage,
    loginUser
};