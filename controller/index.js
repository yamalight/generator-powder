'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        console.log('You called the controller subgenerator with the argument ' + this.name + '.');
        this.camelizedName = this._.camelize(this.name);
        this.camelizedNameLower = this.camelizedName.toLowerCase();
    },

    askFor: function() {
        var done = this.async();

        var prompts = [{
            name: 'controllerPath',
            message: 'What path do you want to use for your controller?',
            default: '/' + this.camelizedNameLower,
        }, {
            type: 'confirm',
            name: 'addServer',
            message: 'Include server controller and template?',
            default: true
        }, {
            type: 'confirm',
            name: 'addCDN',
            message: 'Does your core uses CDN generator for client-side js libraries?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.controllerPath = props.controllerPath;
            this.addCDN = props.addCDN;
            this.addServer = props.addServer;

            done();
        }.bind(this));
    },

    files: function() {
        // if server is needed, copy controller and template
        if (this.addServer) {
            this.template('_view.dust', 'views/' + this.camelizedNameLower + '.dust');
            this.template('_controller.js', 'controllers/main/' + this.camelizedNameLower + '.js');
        }
        // copy client controller
        this.template('_clientController.js', 'client/controllers/' + this.camelizedNameLower + '.js');
        this.template('_template.html', 'public/templates/' + this.camelizedNameLower + '.html');

        // modify client-side controllers file
        var path = 'client/controllers.js';
        var file = this.readFileAsString(path);
        var controllerString = '    app.controller(\'' + this.camelizedName +
            'Controller\', require(\'./controllers/' + this.camelizedNameLower + '.js\'));';
        file = file.replace('};', controllerString + '\n};');
        this.write(path, file);

        // modify client-side routes file
        path = 'client/routes.js';
        file = this.readFileAsString(path);
        var textToReplace = '\n        $locationProvider.html5Mode(true);';
        var routeString = '        $routeProvider.when(\'' + this.controllerPath + '\', { controller: \'' +
            this.camelizedName + 'Controller\', templateUrl: \'/templates/' + this.camelizedNameLower + '.html\' });';
        file = file.replace(textToReplace, routeString + '\n\n        $locationProvider.html5Mode(true);');
        this.write(path, file);
    }
});

module.exports = ControllerGenerator;
