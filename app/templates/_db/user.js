// requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    registrationDate: {type: Date, default: Date.now},
});

// Model
var User = mongoose.model('users', userSchema);

// export
module.exports = User;
