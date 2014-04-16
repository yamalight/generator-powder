module.exports = function applyServices (app) {
    app.service('customService', require('./services/custom.js'));
};
