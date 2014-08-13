'use strict';
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
            name: 'installDeps',
            message: 'Initialize app after generation (say "no" if you want to use vagrant or docker)?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.camelizedAppName = this._.camelize(this.appName);
            this.addGit = props.addGit;
            this.installDeps = props.installDeps;

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir('client');
        this.mkdir('logs');
        this.mkdir('server');
        this.mkdir('tools');
    },

    copyMainFiles: function() {
        // template main stuff
        this.template('package.json', 'package.json');
        this.template('config.js', 'config.js');
        this.template('gulpfile.js', 'gulpfile.js');
        this.template('README.md', 'README.md');

        // copy suplementary files
        this.copy('jshintrc', '.jshintrc');
        this.copy('jscsrc', '.jscsrc');
        this.copy('nodemonignore', '.nodemonignore');
    },

    app: function() {
        this.scaffoldFolders();
        this.copyMainFiles();
    },

    projectfiles: function() {
        this.directory('client', 'client');
        this.directory('server', 'server');
        this.directory('tools', 'tools');

        // process git stuff
        if (this.addGit) {
            this.template('gitignore', '.gitignore');
            this.copy('_optional/gulp/git.js', 'tools/gulp/tasks/git.js');
        }
    }
});

module.exports = PowderGenerator;
