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

var DecoratorGenerator = module.exports = function DecoratorGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(DecoratorGenerator, yeoman.generators.Base);

DecoratorGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        type: 'confirm',
        name: 'needpartial',
        message: 'Is this a UI component directive ?',
        default: true
    }];

    cgUtils.addNamePrompt(this, prompts, 'directive');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        this.needpartial = props.needpartial;
        cgUtils.askForModuleAndDir('directive', this, false, cb);
    }.bind(this));

};

DecoratorGenerator.prototype.files = function files() {
    var configName = 'directiveSimpleTemplates';
    var defaultDir = 'templates/simple';
    if (this.needpartial) {
        configName = 'directiveComplexTemplates';
        defaultDir = 'templates/complex';
    }

    this.name = cgUtils.createName(this, this.name);
    this.codeName = name + 'Directive';
    this.className = cgUtils.createClassName(this, this.name);
    this.elementName = cgUtils.createElementName(this, this.name);
    this.htmlPath = path.join(this.dir, cgUtils.createFilename(this, this.name, 'directive', 'html')).replace(/\\/g, '/').substring(cgUtils.ROOT_DIRECTORY.length);

    cgUtils.processTemplates(this.name, this.dir, 'directive', this, defaultDir, configName, this.module);

};
