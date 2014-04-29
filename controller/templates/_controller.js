module.exports = function(app) {
    // <%= camelizedName %>
    app.get('<%= controllerPath %>', function(req, res) {
        return res.render('<%= camelizedNameLower %>');
    });
};
