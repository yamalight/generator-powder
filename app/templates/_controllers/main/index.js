
// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res) {
        return res.render('index');
    }
};
