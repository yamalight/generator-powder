// includes
var fs = require('fs');
var logger = require('../logger');

module.exports = function(app, options) {
    var verbose = options.verbose;
    fs.readdirSync(__dirname + '/../controllers').forEach(function(dname) {
        fs.readdirSync(__dirname + '/../controllers/' + dname).forEach(function(cname) {
            // skip folders
            if (fs.statSync(__dirname + '/../controllers/' + dname + '/' + cname).isDirectory()) {
                return;
            }

            // define vars
            if (verbose) {
                logger.info('[file]: %s:', cname);
            }

            // load
            require('./../controllers/' + dname + '/' + cname)(app);
        });
    });
};
