var should = require('should');
var Browser = require('zombie');
var config = require('../../config');
var browser = new Browser({site: 'http://localhost:'+config.defaultPort});

describe('<%= camelizedAppName %> Web Site', function(){
    it('Index page', function(done){
        // visit
        browser.visit('/', function () {
            browser.success.should.be.ok;
            browser.text('title').should.be.equal('<%= appName %>');
            browser.text('h1').should.be.equal('I am home controller');

            done();
        });
    });
});
