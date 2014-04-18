module.exports = function <%= camelizedName %>Filter () {
    return function (input) {
        return '<%= camelizedName %> filter: ' + input;
    };
};
