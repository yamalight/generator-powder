'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var FilterGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the filter subgenerator with the argument ' + this.name + '.');
    this.camelizedName = this._.camelize(this.name);
  },

  files: function () {
    this.template('_filter.js', 'public/js/filters/' + this.camelizedName + '.js');

    // modify client-side directives file
    var path = 'public/js/filters.js';
    var file = this.readFileAsString(path);
    var directiveString = '    app.filter(\'' + this.camelizedName + '\', require(\'./filters/' + this.camelizedName + '.js\'));';
    file = file.replace('};', directiveString + '\n};');
    this.write(path, file);
  }
});

module.exports = FilterGenerator;