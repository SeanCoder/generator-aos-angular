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

var ConstantGenerator = module.exports = function ConstantGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ConstantGenerator, yeoman.generators.Base);

ConstantGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    cgUtils.addNamePrompt(this, prompts, 'constant');

    this.prompt(prompts, function (props) {
        if (props.name) {
            this.name = cgUtils.prefixName(props.name);
        }
        cgUtils.askForModuleAndDir('constant', this, false, cb);
    }.bind(this));


};

ConstantGenerator.prototype.files = function files() {

    cgUtils.processTemplates(this.name, this.dir, 'constant', this, null, null, this.module);

};
