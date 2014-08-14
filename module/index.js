'use strict';
var yeoman = require('yeoman-generator');

var ControllerGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        console.log('You called the module subgenerator with the argument ' + this.name + '.');
        this.camelizedName = this._.camelize(this.name);
        this.camelizedNameLower = this.camelizedName.toLowerCase();
    },

    askFor: function() {
        var done = this.async();

        var prompts = [{
            name: 'controllerPath',
            message: 'What path do you want to use for your new controller?',
            default: '/' + this.camelizedNameLower,
        }, {
            type: 'confirm',
            name: 'addController',
            message: 'Add new angular controller and template for it?',
            default: true
        }, {
            type: 'confirm',
            name: 'addDirective',
            message: 'Add new angular directive with controller and template for it?',
            default: false
        }, {
            type: 'confirm',
            name: 'addService',
            message: 'Add new angular service?',
            default: false
        }, {
            type: 'confirm',
            name: 'addFilter',
            message: 'Add new angular filter?',
            default: false
        }];

        this.prompt(prompts, function(props) {
            this.controllerPath = props.controllerPath;
            this.addController = props.addController;
            this.addDirective = props.addDirective;
            this.addService = props.addService;
            this.addFilter = props.addFilter;

            done();
        }.bind(this));
    },

    files: function() {
        var basePath = 'client/js/' + this.camelizedNameLower + '/';

        // copy bootstrapper
        this.template('index.js', basePath + 'index.js');

        // copy controller
        if (this.addController) {
            this.template('controller.js', basePath + 'controller.js');
            this.template('template.html', basePath + 'template.html');
        }

        if (this.addDirective) {
            this.template('directive.js', basePath + 'directive.js');
            this.template('directive-controller.js', basePath + 'directive-controller.js');
            this.template('directive-template.html', basePath + 'directive-template.html');
        }

        if (this.addService) {
            this.template('service.js', basePath + 'service.js');
        }

        if (this.addFilter) {
            this.template('filter.js', basePath + 'filter.js');
        }

        // modify client-side modules loader
        var path = 'client/js/modules.js';
        var file = this.readFileAsString(path);
        var oldString = '    // your page here';
        var newString = '    // ' + this.camelizedName + ' page\n' +
            '    require(\'./' + this.camelizedNameLower + '\'),' +
            '\n' + oldString;
        file = file.replace(oldString, newString);
        this.write(path, file);
    }
});

module.exports = ControllerGenerator;
