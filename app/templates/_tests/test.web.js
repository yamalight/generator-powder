var should = require('should');
var Browser = require('zombie');
var config = require('../config');
var browser = new Browser({site: 'http://localhost:'+config.defaultPort});

describe('<%= appName %> Web Site', function(){
    it('Index page', function(done){
        // visit
        browser.visit('/', function () {
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('<%= appName %>');

            done();
        });
    });
});