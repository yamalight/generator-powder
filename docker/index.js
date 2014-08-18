'use strict';
var yeoman = require('yeoman-generator');

var DockerGenerator = yeoman.generators.Base.extend({
    init: function() {
        console.log('You called the docker subgenerator.');
    },

    files: function() {
        this.copy('_Dockerfile', 'Dockerfile');
        this.copy('dockerignore', '.dockerignore');

        // modify package.json and remove postinstall step
        var path = 'package.json';
        var file = this.readFileAsString(path);
        var oldString = ',\n' + '    "postinstall": "gulp init"';
        file = file.replace(oldString, '');
        this.write(path, file);
    }
});

module.exports = DockerGenerator;
