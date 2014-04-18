'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the controller subgenerator with the argument ' + this.name + '.');
    this.camelizedName = this._.camelize(this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'controllerPath',
      message: 'What path do you want to use for your controller?',
      default: '/' + this.name,
    },{
        type: 'confirm',
        name: 'addCDN',
        message: 'Does your core uses CDN generator for client-side js libraries?',
        default: true
    }];

    this.prompt(prompts, function (props) {
      this.controllerPath = props.controllerPath;
      this.addCDN = props.addCDN;

      done();
    }.bind(this));
  },

  files: function () {
    this.template('_view.dust', 'views/' + this.camelizedName + '.dust');
    this.template('_controller.js', 'controllers/main/' + this.camelizedName + '.js');
    this.template('_clientController.js', 'public/js/controllers/' + this.camelizedName + '.js');
    this.template('_template.html', 'public/templates/' + this.camelizedName + '.html');

    // modify client-side controllers file
    var path = 'public/js/controllers.js';
    var file = this.readFileAsString(path);
    var controllerString = '    app.controller(\'' + this.camelizedName + 'Controller\', [\'$scope\', require(\'./controllers/' + this.camelizedName + '.js\')]);';
    file = file.replace('};', controllerString + '\n};');
    this.write(path, file);

    // modify client-side routes file
    path = 'public/js/routes.js';
    file = this.readFileAsString(path);
    var textToReplace = '\n        $locationProvider.html5Mode(true);';
    var routeString = '        $routeProvider.when(\'' + this.controllerPath + '\', { controller: \'' +
                        this.camelizedName + 'Controller\', templateUrl: \'/templates/' + this.camelizedName + '.html\' });';
    file = file.replace(textToReplace, routeString + '\n\n        $locationProvider.html5Mode(true);');
    this.write(path, file);
  }
});

module.exports = ControllerGenerator;