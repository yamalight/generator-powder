// if debug is enabled
exports.debug = true;
<% if(addServer) { %>
// cookies stuff
exports.sidSalt = 'initMe';
exports.cookieParserSalt = 'initMeToo';
exports.cookieSecret = 'andMeToo';

// password salt
exports.passwordSalt = 'ThisIsPasswordSalt';

// default app port
exports.defaultHost = 'localhost';
exports.defaultPort = 8080;
exports.baseUrl = 'http://' + exports.defaultHost + ':' + exports.defaultPort + '/';
<% } %>
