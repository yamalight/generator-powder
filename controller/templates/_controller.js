module.exports = function(app) {
    // <%= camelizedName %>
    app.get('<%= controllerPath %>', function(req, res) {
        var testData = {test: 'I am a test data from server!'};
        return res.render('<%= camelizedNameLower %>', {
            initData: testData // pass test data to angular
        });
    });
};
