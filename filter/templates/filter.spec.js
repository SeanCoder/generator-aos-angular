describe('<%= codeName %>', function () {

    beforeEach(module('<%= appname %>'));

    it('should ...', inject(function ($filter) {

        var filter = $filter('<%= codeName %>');

        expect(filter('input')).toEqual('output');

    }));

});
