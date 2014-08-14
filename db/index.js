'use strict';
var yeoman = require('yeoman-generator');

var DbGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        console.log('You called the db subgenerator with the argument ' + this.name + '.');
        this.camelizedName = this._.camelize(this.name);
    },

    askFor: function() {
        var done = this.async();

        var prompts = [{
            type: 'confirm',
            name: 'addUser',
            message: 'Do you want to add basic user model?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.addUser = props.addUser;

            done();
        }.bind(this));
    },

    files: function() {
        this.template('db.js', 'server/models/db.js');
        this.template('index.js', 'server/models/index.js');
        if (this.addUser) {
            this.template('user.js', 'server/models/user.js');
        }

        // modify config
        var path = 'config.js';
        var file = this.readFileAsString(path);
        var newString = '\n// default db\n' + 'exports.db = \'mongodb://localhost/' + this.camelizedName + '\';\n';
        file += newString;
        this.write(path, file);

        // install mongoose
        this.spawnCommand('npm', ['instal', '--save', 'mongoose']);
    }
});

module.exports = DbGenerator;
