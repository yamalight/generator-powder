
// export index
exports.<%= name %> = {
    path: '<%= controllerPath %>',
    method: 'get',
    returns: function(req, res) {
        return res.render('<%= name %>');
    }
};
