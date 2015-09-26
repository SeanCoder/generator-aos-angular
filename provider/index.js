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

var ProviderGenerator = module.exports = function ProviderGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ProviderGenerator, yeoman.generators.Base);

ProviderGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this, prompts, 'provider');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = props.name;
        }
        cgUtils.askForModuleAndDir('provider', this, false, cb);
    }.bind(this));

};

ProviderGenerator.prototype.files = function files() {

    this.name = cgUtils.createName(this, this.name);
    this.codeName = this.name;

    cgUtils.processTemplates(this.name, this.dir, 'provider', this, null, null, this.module);

};
