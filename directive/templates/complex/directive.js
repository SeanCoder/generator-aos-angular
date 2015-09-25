/**
 * @ngdoc directive
 * @name <%= appname %>.<%= codeName %>
 *
 * @description
 * TODO - Complete this description with full details about this directive.
 */
angular.module('<%= appname %>').directive('<%= codeName %>', function() {
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
