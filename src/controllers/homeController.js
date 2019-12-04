function getHomePage (req, res) {
    let data = {
        page: 'home'
    };

    res.render('index', data);
}

module.exports = {
    getHomePage
};
