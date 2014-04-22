// includes
var fs = require('fs');
var logger = require('../logger');

module.exports = function(parent, options){
    var verbose = options.verbose;
    fs.readdirSync(__dirname + '/../controllers').forEach(function(dname){
        fs.readdirSync(__dirname + '/../controllers/'+dname).forEach(function(cname){
            // skip folders
            if (fs.statSync(__dirname + '/../controllers/' + dname + '/' + cname).isDirectory()) {
                return;
            }

            // define vars
            if (verbose) {
                logger.info('[file]: %s:', cname);
            }

            var obj = require('./../controllers/' + dname + '/' + cname);
            var method, path, key;

            // generate routes based
            // on the exported methods
            for (key in obj) {
                method = obj[key].method;
                path = obj[key].path;
                parent[method](path, obj[key].returns);

                if (verbose) {
                    logger.info('[route]: %s %s -> %s', method.toUpperCase(), path, key);
                }
            }
        });
    });
};