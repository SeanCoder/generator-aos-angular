/**
 * @ngdoc factory
 * @name <%= appname %>.<%= codeName %>
 *
 * @description
 * TODO - Complete this description with full details about this factory.
 */
angular.module('<%= appname %>').factory('<%= codeName %>', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
        someMethod: function () {
            return meaningOfLife;
        }
    };
});
