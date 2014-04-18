module.exports = function <% camelizedName %>Service () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getData = function() {
        return ['This', 'is', 'a', 'test', 'data'];
    };
};