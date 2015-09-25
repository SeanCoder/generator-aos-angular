/**
 * @ngdoc provider
 * @name <%= appname %>.<%= codeName %>
 *
 * @description
 * TODO - Complete this description with full details about this provider.
 */
angular.module('<%= appname %>').factory('<%= codeName %>', function () {
    // Private variables
    var salutation = 'Hello';

    // Private constructor
    function Greeter() {
        this.greet = function () {
            return salutation;
        };
    }

    // Public API for configuration
    this.setSalutation = function (s) {
        salutation = s;
    };

    // Method for instantiating
    this.$get = function () {
        return new Greeter();
    };
});
