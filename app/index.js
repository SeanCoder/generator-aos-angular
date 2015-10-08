'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var cgUtils = require('../utils.js');

var CgangularGenerator = module.exports = function CgangularGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('constantDirectory', 'constant/');
        this.config.set('controllerDirectory', 'controller/');
        this.config.set('decoratorDirectory', 'decorator/');
        this.config.set('factoryDirectory', 'factory/');
        this.config.set('filterDirectory', 'filter/');
        this.config.set('partialDirectory', 'partial/');
        this.config.set('providerDirectory', 'provider/');
        this.config.set('modalDirectory', 'partial/');
        this.config.set('serviceDirectory', 'service/');
        this.config.set('directiveDirectory', 'directive/');
        this.config.set('filterDirectory', 'filter/');
        this.config.set('serviceDirectory', 'service/');
        this.config.set('useTypeDirectories', false);
        this.config.set('valueDirectory', 'value/');
        var inject = {
            js: {
                file: path.join(cgUtils.ROOT_DIRECTORY, 'index.html'),
                marker: cgUtils.JS_MARKER,
                template: '<script src="<%= filename %>"></script>'
            }
        };

        if (this.config.get('sass')) {
            inject.scss = {
                relativeToModule: true,
                file: '<%= module %>.scss',
                marker: cgUtils.SASS_MARKER,
                template: '@import "<%= filename %>";'
            };
        } else {
            inject.less = {
                relativeToModule: true,
                file: '<%= module %>.less',
                marker: cgUtils.LESS_MARKER,
                template: '@import "<%= filename %>";'
            };
        }

        this.config.set('inject', inject);
        this.config.save();
        this.installDependencies({skipInstall: options['skip-install']});
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.sass = true;
    this.config.set('sass', this.sass);
};

util.inherits(CgangularGenerator, yeoman.generators.Base);

CgangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'appname',
            message: 'What would you like the angular app/module name to be?',
            default: path.basename(process.cwd())
        }, {
            name: 'prefix',
            message: 'Prefix to add to all names?',
            default: cgUtils.PREFIX,
            validate: function (input) {
                return true;
            }
        }];

    this.prompt(prompts, function (props) {
        this.appname = this._.camelize(this._.slugify(this._.humanize(props.appname)));
        this.prefix = props.prefix;
        this.prefixUpperCase = props.prefix.toUpperCase();
        this.config.set('prefix', this.prefix);
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'router',
            type: 'list',
            message: 'Which router would you like to use?',
            default: 1,
            choices: ['Standard Angular Router', 'Angular UI Router']
        }];

    this.prompt(prompts, function (props) {
        if (props.router === 'Angular UI Router') {
            this.uirouter = true;
            this.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
            this.routerModuleName = 'ui.router';
            this.routerViewDirective = 'ui-view';
        } else {
            this.uirouter = false;
            this.routerJs = 'bower_components/angular-route/angular-route.js';
            this.routerModuleName = 'ngRoute';
            this.routerViewDirective = 'ng-view';
        }
        this.config.set('uirouter', this.uirouter);
        cb();
    }.bind(this));
};

CgangularGenerator.prototype.app = function app() {
    this.directory('skeleton/', './');
};
