module.exports = function(app) {
    // index
    app.get('/', function(req, res) {
        var testData = {test: 'I am a test data from server!'};
        return res.render('index', {
            initData: testData // pass test data to angular
        });
    });
};
