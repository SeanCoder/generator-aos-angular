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
    'ngAnimate',
    'ngLocalize',
    'ngLocalize.Config',
    'ngLocalize.InstalledLanguages'
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

angular.module('<%= appname %>').value('localeConf', {
    basePath: 'languages',
    defaultLocale: 'en-US',
    sharedDictionary: 'common',
    fileExtension: '.lang.json',
    persistSelection: true,
    cookieName: 'COOKIE_LOCALE_LANG',
    observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
    delimiter: '::'
});

angular.module('<%= appname %>').value('localeSupported', [
    'en-US'
    /* Add additional locales here */
]);

angular.module('<%= appname %>').value('localeFallbacks', {
    'en': 'en-US'
    /* Add additional fallback locales here */
});
