'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the filter subgenerator with the argument ' + this.name + '.');
    this.camelizedName = this._.camelize(this.name);
  },

  files: function () {
    this.template('_service.js', 'public/js/services/' + this.camelizedName + '.js');

    // modify client-side directives file
    var path = 'public/js/services.js';
    var file = this.readFileAsString(path);
    var serviceString = '    app.service(\'' + this.camelizedName + 'Service\', require(\'./services/' + this.camelizedName + '.js\'));';
    file = file.replace('};', serviceString + '\n};');
    this.write(path, file);
  }
});

module.exports = ServiceGenerator;