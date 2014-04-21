'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the model subgenerator with the argument ' + this.name + '.');
    this.camelizedName = this._.camelize(this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'collectionName',
      message: 'How do you want to call your collection?',
      default: this.camelizedName.toLowerCase() + 's'
    }];

    this.prompt(prompts, function (props) {
      this.collectionName = props.collectionName;
      this.camelizedCollection = this._.camelize(this.collectionName);

      done();
    }.bind(this));
  },

  files: function () {
    this.template('_model.js', 'models/' + this.camelizedName + '.js');

    // modify client-side directives file
    var path = 'models/index.js';
    var file = this.readFileAsString(path);
    var newModelString = '\nexports.' + this.camelizedName + ' = require(\'./' + this.camelizedName + '.js\');';
    file += newModelString;
    this.write(path, file);
  }
});

module.exports = ModelGenerator;