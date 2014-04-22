// requires
var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../logger');
var db;

// connect
mongoose.connect(config.db);
// init db
db = mongoose.connection;
// log all errors
db.on('error', logger.error.bind(logger, '[db] connection error:'));

// export
module.exports = db;
