var gulp    = require('gulp');
var nodemon = require('nodemon');
var context = require('../../app');
var config = require('../../config');

module.exports = function(){
    // start nodemon
    nodemon({script: './app.js'});
    // listen for events
    nodemon.on('start', function () {
        console.log('Starting up context, serving on [localhost:' + config.defaultPort + ']');
        console.log('Hit CTRL-C to stop the server');
    }).on('quit', function () {
        console.log('App has quit');
    }).on('restart', function (files) {
        console.log('App restarted due to: ', files);
    });
};