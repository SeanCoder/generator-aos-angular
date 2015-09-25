/**
 * @ngdoc modukle
 * @name <%= codeName %>
 *
 * @description
 * TODO - Complete this description with full details.
 */
angular.module('<%= codeName %>', [
    'ui.bootstrap',
    'ui.utils',
    '<%= routerModuleName %>',
    'ngAnimate',
    'ngLocalize',
    'ngLocalize.Config',
    'ngLocalize.InstalledLanguages'
]);

<% if (!uirouter) { %>
angular.module('<%= codeName %>').config(function($routeProvider) {

    /* Add New Routes Above */

});
<% } %><% if (uirouter) { %>
angular.module('<%= codeName %>').config(function($stateProvider) {

    /* Add New States Above */

});
<% } %>
