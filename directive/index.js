'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        console.log('You called the directive subgenerator with the argument ' + this.name + '.');
        this.camelizedName = this._.camelize(this.name);
    },

    files: function() {
        this.template('_directive.js', 'client/directives/' + this.camelizedName + '.js');

        // modify client-side directives file
        var path = 'client/directives.js';
        var file = this.readFileAsString(path);
        var directiveString = '    app.directive(\'' + this.camelizedName +
            'Directive\', require(\'./directives/' + this.camelizedName + '.js\'));';
        file = file.replace('};', directiveString + '\n};');
        this.write(path, file);
    }
});

module.exports = DirectiveGenerator;
