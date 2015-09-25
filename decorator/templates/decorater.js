/**
 * @ngdoc directive
 * @name <%= appname %>.<%= codeName %>
 *
 * @description
 * TODO - Complete this description with full details about this directive.
 */
angular.module('<%= appname %>').config(function ($provide) {
    $provide.decorator('<%= codeName %>', function ($delegate) {
        // decorate the $delegate
        return $delegate;
    });
});
