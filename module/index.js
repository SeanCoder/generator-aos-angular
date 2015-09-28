'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

    this.uirouter = this.config.get('uirouter');
    this.routerModuleName = this.uirouter ? 'ui.router' : 'ngRoute';
};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this, prompts, 'module');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('module', this, false, cb);
    }.bind(this));

};

ModuleGenerator.prototype.files = function files() {
    var appname = require(process.cwd() + '/package.json').name;

    this.dir = path.join(this.dir, this.name, '/');
    this.name = cgUtils.createModuleName(this, appname, this.dir, cgUtils.createName(this, this.name, true));
    this.codeName = this.name;


    var module = cgUtils.getParentModule(path.join(this.dir, '..'));
    module.dependencies.modules.push(_.camelize(this.name));
    module.save();
    this.log.writeln(chalk.green(' updating') + ' %s', path.basename(module.file));

    var type = 'module';
    cgUtils.processTemplates(this.name, this.dir, type, this, null, null, module);

    var modules = this.config.get('modules');
    if (!modules) {
        modules = [];
    }
    modules.push({name: this.codeName, file: path.join(this.dir, cgUtils.createFilename(this, this.name, type, 'js'))});
    this.config.set('modules', modules);
    this.config.save();
};
