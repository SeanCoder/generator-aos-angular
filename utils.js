var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var chalk = require('chalk');
_.str = require('underscore.string');
_.mixin(_.str.exports());
var ngParseModule = require('ng-parse-module');
var finder = require('find-files');


exports.JS_MARKER = "<!-- Add New Component JS Above -->";
exports.PREFIX = "";
exports.LESS_MARKER = "/* Add Component LESS Above */";
exports.SASS_MARKER = "/* Add Component SASS Above */";

exports.ROUTE_MARKER = "/* Add New Routes Above */";
exports.STATE_MARKER = "/* Add New States Above */";

exports.ROOT_DIRECTORY = "app/";
exports.ROOT_SCRIPTS_DIRECTORY = path.join(exports.ROOT_DIRECTORY, 'scripts', '/');
exports.ROOT_STYLES_DIRECTORY = path.join(exports.ROOT_DIRECTORY, 'styles', '/');

exports.addToFile = function (filename, lineToAdd, beforeMarker) {
    try {
        var fullPath = path.resolve(process.cwd(), filename);
        var fileSrc = fs.readFileSync(fullPath, 'utf8');

        var indexOf = fileSrc.indexOf(beforeMarker);
        var lineStart = fileSrc.substring(0, indexOf).lastIndexOf('\n') + 1;
        var indent = fileSrc.substring(lineStart, indexOf);
        fileSrc = fileSrc.substring(0, indexOf) + lineToAdd + "\n" + indent + fileSrc.substring(indexOf);

        fs.writeFileSync(fullPath, fileSrc);
    } catch (e) {
        throw e;
    }
};

exports.processTemplates = function (name, dir, type, that, defaultDir, configName, module) {

    if (!defaultDir) {
        defaultDir = 'templates'
    }
    if (!configName) {
        configName = type + 'Templates';
    }

    var templateDirectory = path.join(path.dirname(that.resolved), defaultDir);
    if (that.config.get(configName)) {
        templateDirectory = path.join(process.cwd(), that.config.get(configName));
    }
    _.chain(fs.readdirSync(templateDirectory))
        .filter(function (template) {
            var css = that.config.sass ? '.scss' : '.less';
            return template[0] !== '.' && template.indexOf(css) === -1;
        })
        .each(function (template) {
            var filename = name + '.' + type;
            var customTemplateName = template.replace(type, filename);
            var templateFile = path.join(templateDirectory, template);
            //create the file
            that.template(templateFile, path.join(dir, customTemplateName));
            //inject the file reference into index.html/app.less/etc as appropriate
            exports.inject(path.join(dir, customTemplateName), that, module);
        });
};

exports.inject = function (filename, that, module) {
    //special case to skip unit tests
    if (_(filename).endsWith('-spec.js') ||
        _(filename).endsWith('_spec.js') ||
        _(filename).endsWith('-test.js') ||
        _(filename).endsWith('.test.js') ||
        _(filename).endsWith('.spec.js') ||
        _(filename).endsWith('_test.js')) {
        return;
    }

    var ext = path.extname(filename);
    if (ext[0] === '.') {
        ext = ext.substring(1);
    }
    var config = that.config.get('inject')[ext];
    if (config) {
        var configFile = _.template(config.file)({module: path.basename(module.file, '.js')});
        var injectFileRef = path.relative(exports.ROOT_DIRECTORY, filename);
        if (config.relativeToModule) {
            configFile = path.join(path.dirname(module.file), configFile);
            injectFileRef = path.relative(path.dirname(module.file), filename);
        }
        injectFileRef = injectFileRef.replace(/\\/g, '/');
        var lineTemplate = _.template(config.template)({filename: injectFileRef});
        exports.addToFile(configFile, lineTemplate, config.marker);
        that.log.writeln(chalk.green(' updating') + ' %s', path.basename(configFile));
    }
};

exports.injectRoute = function (moduleFile, uirouter, name, route, routeUrl, that) {

    routeUrl = routeUrl.replace(/\\/g, '/');

    if (uirouter) {
        var code = '$stateProvider.state(\'' + name + '\', {\n        url: \'' + route + '\',\n        templateUrl: \'' + routeUrl + '\'\n    });';
        exports.addToFile(moduleFile, code, exports.STATE_MARKER);
    } else {
        exports.addToFile(moduleFile, '$routeProvider.when(\'' + route + '\',{templateUrl: \'' + routeUrl + '\'});', exports.ROUTE_MARKER);
    }

    that.log.writeln(chalk.green(' updating') + ' %s', path.basename(moduleFile));

};

exports.getParentModule = function (dir) {
    //starting this dir, find the first module and return parsed results
    if (fs.existsSync(dir)) {
        var files = fs.readdirSync(dir);
        for (var i = 0; i < files.length; i++) {
            if (path.extname(files[i]) !== '.js') {
                continue;
            }
            var results = ngParseModule.parse(path.join(dir, files[i]));
            if (results) {
                return results;
            }
        }
    }

    if (fs.existsSync(path.join(dir, '.yo-rc.json'))) {
        //if we're in the root of the project then bail
        return;
    }

    return exports.getParentModule(path.join(dir, '..'));
};

exports.askForModule = function (type, that, cb) {

    var modules = that.config.get('modules');
    var appFilename = path.join(exports.ROOT_SCRIPTS_DIRECTORY, 'app.js');

    var mainModule = ngParseModule.parse(appFilename);
    mainModule.primary = true;

    var moduleLength = modules ? modules.length : 0;

    if (moduleLength === 0) {
        cb.bind(that)(mainModule);
        return;
    }

    var choices = _.pluck(modules, 'name');
    choices.unshift(mainModule.name + ' (Primary Application Module)');

    var prompts = [
        {
            name: 'module',
            message: 'Which module would you like to place the new ' + type + '?',
            type: 'list',
            choices: choices,
            default: 1
        }
    ];

    that.prompt(prompts, function (props) {

        var i = choices.indexOf(props.module);

        var module;

        if (i === 0) {
            module = mainModule;
        } else {
            module = ngParseModule.parse(modules[i - 1].file);
        }

        cb.bind(that)(module);
    }.bind(that));

};

exports.askForDir = function (type, that, module, ownDir, cb) {

    that.module = module;
    that.appname = module.name;
    that.dir = path.dirname(module.file);

    that.log.writeln('The dir is ' + that.dir);

    var defaultDir = '';
    if (module.primary) {
        var configedDir = that.config.get(type + 'Directory');
        if (!configedDir) {
            configedDir = '.';
        }
        defaultDir = path.join(that.dir, configedDir, '/');
    } else {
        defaultDir = path.join(that.dir, '/');
    }
    defaultDir = path.relative(process.cwd(), defaultDir);

    if (ownDir) {
        defaultDir = path.join(defaultDir, that.name);
    }

    defaultDir = path.join(defaultDir, '/');

    var dirPrompt = [
        {
            name: 'dir',
            message: 'Where would you like to create the ' + type + ' files?',
            default: defaultDir,
            validate: function (dir) {
                if (!module.primary) {
                    //ensure dir is in module dir or subdir of it
                    dir = path.resolve(dir);
                    if (path.relative(that.dir, dir).substring(0, 2) === '..') {
                        return 'Files must be placed inside the module directory or a subdirectory of the module.'
                    }
                }
                return true;
            }
        }
    ];

    var dirPromptCallback = function (props) {

        that.dir = path.join(props.dir, '/');
        var dirToCreate = that.dir;
        if (ownDir) {
            dirToCreate = path.join(dirToCreate, '..');
        }

        if (!fs.existsSync(dirToCreate)) {
            that.prompt([{
                name: 'isConfirmed',
                type: 'confirm',
                message: chalk.cyan(dirToCreate) + ' does not exist.  Create it?'
            }], function (props) {
                if (props.isConfirmed) {
                    cb();
                } else {
                    that.prompt(dirPrompt, dirPromptCallback);
                }
            });
        } else if (ownDir && fs.existsSync(that.dir)) {
            //if the dir exists and this type of thing generally is inside its own dir, confirm it
            that.prompt([{
                name: 'isConfirmed',
                type: 'confirm',
                message: chalk.cyan(that.dir) + ' already exists.  Components of this type contain multiple files and are typically put inside directories of their own.  Continue?'
            }], function (props) {
                if (props.isConfirmed) {
                    cb();
                } else {
                    that.prompt(dirPrompt, dirPromptCallback);
                }
            });
        } else {
            cb();
        }

    };

    that.prompt(dirPrompt, dirPromptCallback);

};

exports.askForModuleAndDir = function (type, that, ownDir, cb) {
    exports.askForModule(type, that, function (module) {
        exports.askForDir(type, that, module, ownDir, cb);
    });
};

exports.getNameArg = function (that, args) {
    if (args.length > 0) {
        that.name = args[0];
    }
};

exports.addNamePrompt = function (that, prompts, type) {
    if (!that.name) {
        prompts.splice(0, 0, {
            name: 'name',
            message: 'Enter a name for the ' + type + '.',
            validate: function (input) {
                return true;
            }
        });
    }
};

exports.rebuildConfiguration = function (that) {
    var modules = that.config.get('modules');
    // Search for all files with the .module.js extension
    var fullPath = path.resolve(process.cwd(), exports.ROOT_SCRIPTS_DIRECTORY);

    if (fs.existsSync(fullPath)) {
        finder('.*[.]module[.]js', {
            root: fullPath
        }, function (foundFiles) {
            if (foundFiles && foundFiles.length) {
                that.log.writeln('Found ' + foundFiles.length + ' modules.');
                var modules = [];
                _.each(foundFiles, function (file) {
                    if (file) {
                        that.log.writeln('Parsing file "' + file.name + '" located at "' + file.filepath);
                        var module = ngParseModule.parse(file.filepath);
                        if (module && module.name && module.file) {
                            var moduleFile = module.file;
                            var pos = moduleFile.indexOf(exports.ROOT_SCRIPTS_DIRECTORY);
                            if (pos >= 0) {
                                moduleFile = moduleFile.substr(pos);
                            }
                            var newModule = {
                                name: module.name,
                                file: moduleFile
                            };
                            that.log.writeln('Adding module "' + newModule.name + '" located at "' + newModule.file);
                            modules.push(newModule);
                        }
                    }
                });
                that.config.set('modules', modules);
                that.config.save();
            } else {
                that.log.writeln('Found no modules.');
            }
        });
    }
};

exports.prefixName = function (that, name) {
    if (name && name.length) {
        var prefix = that.config.get('prefix') || exports.PREFIX;
        name = prefix + name;
    }

    return name;
};
