/**
 * @ngdoc module
 * @name <%= appname %>
 *
 * @description
 * TODO - Complete this description with full details about this module.
 */
angular.module('<%= appname %>', [
    'ui.bootstrap',
    'ui.utils',
    '<%= routerModuleName %>',
    'ngAria',
    'ngAnimate',
    'pascalprecht.translate'
]);

<% if (!uirouter) { %>
angular.module('<%= appname %>').config(function($routeProvider) {

    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});
<% } %><% if (uirouter) { %>
angular.module('<%= appname %>').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});
<% } %>
angular.module('<%= appname %>').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('<%= appname %>').config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en-US');
});
