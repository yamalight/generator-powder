'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var VagrantGenerator = yeoman.generators.Base.extend({
    init: function() {
        console.log('You called the vagrant subgenerator.');
    },

    files: function() {
        // make dir
        this.mkdir('vagrant');

        // copy files
        this.copy('_Vagrantfile', 'Vagrantfile');
        this.copy('_install.sh', 'vagrant/install.sh');
    }
});

module.exports = VagrantGenerator;
