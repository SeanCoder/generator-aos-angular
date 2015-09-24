/**
 * @ngdoc directive
 * @name <%= _.camelize(name) %>
 *
 * @description
 * TODO - Complete this description with full details about this directive.
 */
angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl: '<%= htmlPath %>',
        link: function(scope, element, attrs, fn) {


        }
    };
});
