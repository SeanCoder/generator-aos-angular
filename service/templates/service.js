/**
 * @ngdoc service
 * @name <%= _.camelize(name) %>
 *
 * @description
 * TODO - Complete this description with full details about this service.
 */
angular.module('<%= appname %>').factory('<%= _.camelize(name) %>',function() {

    var <%= _.camelize(name) %> = {};

    return <%= _.camelize(name) %>;
});
