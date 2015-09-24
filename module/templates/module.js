/**
 * @ngdoc modukle
 * @name <%= _.camelize(name) %>
 *
 * @description
 * TODO - Complete this description with full details.
 */
angular.module('<%= _.camelize(name) %>', [
    'ui.bootstrap',
    'ui.utils',
    '<%= routerModuleName %>',
    'ngAnimate',
    'ngLocalize',
    'ngLocalize.Config',
    'ngLocalize.InstalledLanguages'
]);

<% if (!uirouter) { %>
angular.module('<%= _.camelize(name) %>').config(function($routeProvider) {

    /* Add New Routes Above */

});
<% } %><% if (uirouter) { %>
angular.module('<%= _.camelize(name) %>').config(function($stateProvider) {

    /* Add New States Above */

});
<% } %>
