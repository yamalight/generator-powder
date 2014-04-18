
// export index
exports.<%= camelizedName %> = {
    path: '<%= controllerPath %>',
    method: 'get',
    returns: function(req, res) {
        return res.render('<%= camelizedName %>');
    }
};
