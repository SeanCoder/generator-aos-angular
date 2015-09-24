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

var ValueGenerator = module.exports = function ValueGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ValueGenerator, yeoman.generators.Base);

ValueGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this, prompts, 'value');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = cgUtils.prefixName(props.name);
        }
        cgUtils.askForModuleAndDir('value', this, false, cb);
    }.bind(this));


};

ValueGenerator.prototype.files = function files() {

    cgUtils.processTemplates(this.name, this.dir, 'value', this, null, null, this.module);

};
