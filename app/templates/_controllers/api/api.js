module.exports = function(app) {
    // api index
    app.get('/api/', function(req, res) {
        return res.send({status: 'OK'});
    });
};
