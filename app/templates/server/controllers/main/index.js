module.exports = function(app) {
    // index
    app.get('/*', function(req, res) {
        return res.render('index');
    });
};
