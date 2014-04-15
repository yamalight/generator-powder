
// export index
exports.index = {
    path: '/',
    method: 'get',
    returns: function(req, res, next) {
        return res.render('index');
    }
};
