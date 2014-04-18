// requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= camelizedName %>Schema = new Schema({
    field: {type: String, unique: true},
});

// Model
var <%= camelizedName %> = mongoose.model('<%= camelizedCollection.toLowerCase() %>', <%= camelizedName %>Schema);

// export
module.exports = <%= camelizedName %>;
