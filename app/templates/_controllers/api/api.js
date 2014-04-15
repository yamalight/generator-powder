
// export index
exports.api = {
    path: '/api/',
    method: 'get',
    returns: function(req, res) {
        return res.send({status: 'OK'});
    }
};
