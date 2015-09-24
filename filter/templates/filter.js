/**
 * @ngdoc filter
 * @name <%= _.camelize(name) %>
 *
 * @description
 * TODO - Complete this description with full details about this filter.
 */
angular.module('<%= appname %>').filter('<%= _.camelize(name) %>', function () {
    return function (input, arg) {
        return 'output';
    };
});
