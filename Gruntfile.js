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
					srcPath('params.js'),
					srcPath('helpers.js'),
					srcPath('url.js'),
					srcPath('fluid.js'),
					srcPath('onready.js'),
					srcPath('colors.js'),
					srcPath('xpath.js'),
					srcPath('suffix.js')
				],
				dest: jsFile
			},

			nopolyjs: {
				src: [
					srcPath('prefix.js'),
					buildPath('core.js'),
					srcPath('params.js'),
					srcPath('helpers.js'),
					srcPath('url.js'),
					srcPath('fluid.js'),
					srcPath('onready.js'),
					srcPath('colors.js'),
					srcPath('xpath.js'),
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
			},

			ci: {
				configFile: 'karma-travis.conf.js'
			}
		},

		jsdoc2md: {
			oneOutputFile: {
				src: "dist/imgix.js",
				dest: docsApiFile,
				options: {
					index: false,
					"sort-by": "name"
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

	grunt.registerTask('copy-core', '', function() {
		if (grunt.file.exists(buildDir)) {
			grunt.file.delete(buildDir);
		}
		grunt.file.mkdir(buildDir);
		fileCopy(srcPath('core.js'), buildDir);
	});

	grunt.registerTask('test', ['build', 'karma:unit']);
	grunt.registerTask('test:quick', ['build', 'karma:unitquick']);
	grunt.registerTask('test:travis', ['build', 'karma:ci']);

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

	grunt.registerTask('builddocs', 'build the docs', function() {
		grunt.task.run(['build', 'jsdoc2md', 'doc-cleanup']);
	});

	grunt.registerTask('build', 'build everything', function() {
		if (noPolyfills) {
			grunt.task.run(['copy-core', 'concat:nopolyjs', 'uglify']);
		} else {
			grunt.task.run(['copy-core', 'concat:js', 'uglify']);
		}
	});

	// Default task.
	grunt.registerTask('default', 'build');
};
