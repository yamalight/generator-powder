'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PowderGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.pkg = require('../package.json');

        this.on('end', function() {
            if (this.installDeps) {
                this.installDependencies();
            }
        });
    },

    askFor: function() {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta(
            'You\'re using the fantastic Powder generator.'));

        var prompts = [{
            name: 'appName',
            message: 'What do you want to call your app?'
        }, {
            type: 'confirm',
            name: 'addGit',
            message: 'Would you like to use Git?',
            default: true
        }, {
            type: 'confirm',
            name: 'addAuth',
            message: 'Would you like to include basic auth?',
            default: true
        }, {
            type: 'confirm',
            name: 'addCDN',
            message: 'Would you like to include CDN generator for client-side js libraries?',
            default: true
        }, {
            type: 'confirm',
            name: 'installDeps',
            message: 'Initialize app after generation (say "no" if you use vagrant)?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.camelizedAppName = this._.camelize(this.appName);
            this.addAuth = props.addAuth;
            this.addCDN = props.addCDN;
            this.addGit = props.addGit;
            this.installDeps = props.installDeps;

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir('app');
        this.mkdir('bin');
        this.mkdir('controllers');
        this.mkdir('controllers/api');
        this.mkdir('controllers/main');
        this.mkdir('models');
        this.mkdir('gulp');
        this.mkdir('gulp/tasks');
        this.mkdir('lib');
        this.mkdir('logger');
        this.mkdir('logs');
        this.mkdir('modules');
        this.mkdir('public');
        this.mkdir('public/css');
        this.mkdir('public/img');
        this.mkdir('client');
        this.mkdir('client/controllers');
        this.mkdir('client/data');
        this.mkdir('client/directives');
        this.mkdir('client/filters');
        this.mkdir('client/modules');
        this.mkdir('client/services');
        this.mkdir('public/templates');
        this.mkdir('tests');
        this.mkdir('views');
        this.mkdir('views/core');
        this.mkdir('views/errors');
        this.mkdir('views/helpers');
        this.mkdir('views/menu');

        // only create auth folder if needed
        if (this.addAuth) {
            this.mkdir('controllers/auth');
        }
    },

    copyMainFiles: function() {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_gulpfile.js', 'gulpfile.js');
    },

    app: function() {
        this.scaffoldFolders();
        this.copyMainFiles();
    },

    projectfiles: function() {
        // copy suplementary files
        this.copy('jshintrc', '.jshintrc');
        this.copy('nodemonignore', '.nodemonignore');

        // copy app
        this.copy('_app.js', 'app.js');

        // init config file
        this.template('_config.example.js', 'config.js');

        // app config
        this.directory('_app', 'app');
        // bin
        this.directory('_bin', 'bin');
        // controllers
        this.directory('_controllers/api', 'controllers/api');
        // models / db
        this.directory('_models', 'models');
        // gulp
        this.copy('_gulp/index.js', 'gulp/index.js');
        this.directory('_gulp/tasks', 'gulp/tasks');
        // lib
        this.directory('_lib', 'lib');
        // logger
        this.directory('_logger', 'logger');
        // modules
        this.directory('_modules', 'modules');
        // client-side css/img files
        this.directory('_public/css', 'public/css');
        this.directory('_public/img', 'public/img');
        // base client-side js
        this.copy('_client/jshintrc', 'client/.jshintrc');
        this.copy('_client/app.js', 'client/app.js');
        this.copy('_client/controllers.js', 'client/controllers.js');
        this.copy('_client/directives.js', 'client/directives.js');
        this.copy('_client/filters.js', 'client/filters.js');
        this.copy('_client/routes.js', 'client/routes.js');
        this.copy('_client/services.js', 'client/services.js');
        // client-side data
        this.directory('_client/data', 'client/data');
        // angular directives
        this.directory('_client/directives', 'client/directives');
        // angular filters
        this.directory('_client/filters', 'client/filters');
        // angular modules
        this.directory('_client/modules', 'client/modules');
        // angular services
        this.directory('_client/services', 'client/services');
        // angular templates
        this.directory('_public/templates', 'public/templates');
        // tests
        this.directory('_tests', 'tests');
        // views
        this.directory('_views/core', 'views/core');
        this.directory('_views/errors', 'views/errors');
        this.directory('_views/helpers', 'views/helpers');
        this.directory('_views/menu', 'views/menu');

        // readme
        this.template('_README.md', 'README.md');

        // process CDN stuff
        if (this.addCDN) {
            this.copy('_gulp/_optional/cdn.js', 'gulp/tasks/cdn.js');
        }

        // process git stuff
        if (this.addGit) {
            this.template('gitignore', '.gitignore');
            this.copy('_gulp/_optional/git.js', 'gulp/tasks/git.js');
        }

        // process auth stuff if needed
        if (this.addAuth) {
            this.directory('_controllers/auth', 'controllers/auth');
            this.directory('_controllers/main', 'controllers/main');
            this.directory('_client/controllers', 'client/controllers');
            this.directory('_views', 'views');
        } else {
            this.copy('_controllers/main/index.js', 'controllers/main/index.js');
            this.copy('_client/controllers/home.js', 'client/controllers/home.js');
            this.copy('_views/index.dust', 'views/index.dust');
        }
    }
});

module.exports = PowderGenerator;
