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

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {

    cgUtils.getNameArg(this, args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BuildGenerator, yeoman.generators.Base);

BuildGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'rebuild',
            message: 'Which item would you like to Rebuild?',
            type: 'list',
            choices: ['Modules', 'SaaS'],
            default: 0
        }
    ];

    this.prompt(prompts, function (props) {
        this.rebuild = props.rebuild;
        cb();
    }.bind(this));

};

BuildGenerator.prototype.files = function files() {
    switch (this.rebuild) {
        case 'Modules':
            cgUtils.rebuildConfiguration(this);
            break;
        case 'SaaS':
            cgUtils.rebuildSaaS(this);
            break;
    }
};
