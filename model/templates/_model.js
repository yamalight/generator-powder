// requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= camelizedName.toLowerCase() %>Schema = new Schema({
    field: {type: String, unique: true},
});

// Model
var <%= camelizedName %> = mongoose.model('<%= camelizedCollection.toLowerCase() %>', <%= camelizedName.toLowerCase() %>Schema);

// export
module.exports = <%= camelizedName %>;
