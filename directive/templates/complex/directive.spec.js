describe('<%= _.camelize(name) %>', function () {

    beforeEach(module('<%= appname %>'));

    var scope, compile;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
    }));

    it('should compile correctly.', function () {
        // Add attributes that is required by your component
        var compiledElement = angular.element('<<%= _.dasherize(_.camelize(name)) %> ></<%= _.dasherize(_.camelize(name)) %>>');

        // Configure scope here if required
        // Ex. scope.label = 'Test';

        compile(compiledElement)(scope);
        scope.$digest();

        expect($(compiledElement).find('.<%= _.dasherize(_.camelize(name)) %>')).toHaveLength(1);
    });

    it('should ...', function () {

        /*
         To test your directive, you need to create some html that would use your directive,
         send that through compile() then compare the results.

         var element = compile('<div mydirective name="name">hi</div>')(scope);
         expect(element.text()).toBe('hello, world');
         */

    });
});
