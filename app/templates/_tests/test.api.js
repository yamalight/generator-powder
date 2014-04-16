var should = require('should');
var request = require('request');
var config = require('../config');
var baseUrl = 'http://localhost:'+config.defaultPort;

// redefine request to work with json
request = request.defaults({json: true});

// tests
describe('<%= appName %> Api suite', function(){
    it('#Index', function(done){
        request.get(baseUrl + '/api/', function (error, response, res) {
            should.not.exist(error);
            response.statusCode.should.equal(200);
            res.should.have.property('status');
            res.status.should.be.equal('OK');

            done();
        });
    });
});