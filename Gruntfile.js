module.exports = function(grunt) {
	"use strict";
	var path = require('path'),
		fs = require('fs'),
		_ = require('lodash'),
		path = require('path'),
		exec = require('child_process').exec,
		srcPath = function(p) { return path.normalize(__dirname + "/src/" + p); },
		rootPath = function(p) { return path.normalize(__dirname + "/" + p); },

		buildPath = function(p) { return path.normalize(__dirname + "/build/" + p); },
		distPath = function(p) { return path.normalize(__dirname + "/dist/" + p); },

		noPolyfills = grunt.option("no-polyfills") || false,

		buildDir = rootPath('build'),
		docsApiFile = 'docs/api.md',
		minJsFile = distPath('imgix.min.js'),
		jsFile = distPath('imgix.js'),
		minjQueryJsFile = distPath('imgix.jquery.min.js'),
		jsjQueryFile = distPath('imgix.jquery.js');

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
  	jsdoc2md: 'grunt-jsdoc-to-markdown'
  });

	function fileCopy(src, dest) {
		dest = grunt.file.isFile(dest) ? dest : path.join(dest, path.basename(src));
		grunt.file.copy(src, dest);
	}

	function execRun(cmd, done) {
		exec(cmd, function(err, stdout, stderr) {
			if (err) {
				grunt.fail.fatal(stderr + ' ' + stdout + ' ' + err);
			}
			console.log(stdout);
			if (done) {
				done();
			}
		});
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			version: '0.1.0'
		},

		uglify: {
			options: {
				stripBanners: false,
				banner: '/*! http://www.imgix.com <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> ' + "*/\n\n"

			},

			imgixjs: {
				files: [{
					src: jsFile,
					dest: minJsFile
				}]
			},

			jqueryplugin: {
				files: [{
					src: jsjQueryFile,
					dest: minjQueryJsFile
				}]
			}
		},

		concat: {
			options: {
				stripBanners: false,
				banner: '/*! http://www.imgix.com <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> ' + "\n"

				// NOTE: the rest of this banner is in the prefix.js for the ascii art
			},
			js: {
				src: [
					srcPath('prefix.js'),
					srcPath('polyfills.js'),
					buildPath('core.js'),
					srcPath('suffix.js')
				],
				dest: jsFile
			},

			nopolyjs: {
				src: [
					srcPath('prefix.js'),
					buildPath('core.js'),
					srcPath('suffix.js')
				],
				dest: jsFile
			},

			missing: {
				nonull: true
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			},

			// also run tests with the minified version of the js
			unitmin: {
				configFile: 'karma-min.conf.js'
			},

			unitquick: {
				configFile: 'karma-quick.conf.js'
			}
		},

		jsdoc2md: {
			oneOutputFile: {
				src: "dist/imgix.js",
				dest: docsApiFile,
				options: {
					index: false
				}
			}

		},

    jshint: {
        src: ['src/core.js', 'src/polyfill.js'],
        options: {
            jshintrc: '.jshintrc',
            reporter: require('reporter-plus/jshint')
          }
      },
    jscs: {
        src: ['src/core.js', 'src/polyfill.js'],
        options: {
            config: ".jscsrc",
            reporter: require('reporter-plus/jscs').path
          }
      }
	});

	grunt.registerTask('prebuild', ['copy-core', 'build-dynamic-method-docs']);

	grunt.registerTask('copy-core', '', function() {
		if (grunt.file.exists(buildDir)) {
			grunt.file.delete(buildDir);
		}
		grunt.file.mkdir(buildDir);
		fileCopy(srcPath('core.js'), buildDir);
	});

	grunt.registerTask('test', 'run tests', function() {
		var configPath = path.join(__dirname, '/tests/config.js');
		if (!fs.existsSync(configPath)) {
			throw grunt.util.error("\n\nconfig.js does not exist. Required for tests! (signing)\n");
		} else {
			grunt.task.run(['build', 'karma']);
		}
	});

	grunt.registerTask('test:quick', ['build', 'karma:unitquick']);

	grunt.registerTask('doc-cleanup', 'clean up output', function() {
		var contents = fs.readFileSync(docsApiFile, 'UTF-8');

		contents = contents.split('<a name="imgix"></a>')[1];

		contents = contents.replace(/uRL/g, 'URL');
		contents = contents.replace(/urL/g, 'URL');

		contents = contents.replace('#imgix', '#imgix.js Documentation'); // only first

		contents = "![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)\n\n" + contents;

		contents = "<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> \n\n" + contents;

		fs.writeFileSync(docsApiFile, contents);
	});

	grunt.registerTask('build-dynamic-method-docs', 'build jsdocs for the dynamically built methods', function() {

		if (!grunt.file.exists(distPath('imgix.js'))) {
			console.log("dist/imgix.js does not exist. build again for auto generating docs");
			return;
		}
		var imgix = require('./dist/imgix.js').imgix,
			compiledSet = _.template("/**\n\tApply the \"<%= param %>\" imgix param to the image url. Same as doing .setParam('<%= param %>', val)\n\t@param val the value to set for <%= param %>\n\t@name imgix.URL#set<%= pretty %>\n\t@function\n*/"),

			compiledGet = _.template("/**\n\tGet the value of the \"<%= param %>\" imgix param currently on the image url. Same as doing .getParam('<%= param %>')\n\t@name imgix.URL#get<%= pretty %>\n\t@function\n*/"),

			getDocs = [],
			setDocs = [];

		for (var param in imgix.URL.theGetSetFuncs) {
			(function(tmp) {
				var pretty = imgix.URL.theGetSetFuncs[tmp];

				setDocs.push(compiledSet({pretty: pretty, param: tmp}));
				getDocs.push(compiledGet({pretty: pretty, param: tmp}));
			})(param);
		}

		var coreContents = fs.readFileSync(buildPath('core.js'), 'UTF-8');

		coreContents += "\n\n" + setDocs.join("\n\n") + getDocs.join("\n\n");

		fs.writeFileSync(buildPath('core.js'), coreContents);

	});

	grunt.registerTask('builddocs', 'build the docs', function() {
		grunt.task.run(['build', 'jsdoc2md', 'doc-cleanup']);
	});

	grunt.registerTask('build', 'build everything', function() {
		if (noPolyfills) {
			grunt.task.run(['prebuild', 'concat:nopolyjs', 'uglify']);
		} else {
			grunt.task.run(['prebuild', 'concat:js', 'uglify']);
		}
	});

	// Default task.
	grunt.registerTask('default', 'build');
};
