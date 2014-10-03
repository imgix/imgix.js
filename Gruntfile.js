module.exports = function(grunt) {
	"use strict";
	var path = require('path'),
		fs = require('fs'),
		path = require('path'),
		exec = require('child_process').exec,
		srcPath = function(p) { return path.normalize(__dirname + "/src/" + p); },
		rootPath = function(p) { return path.normalize(__dirname + "/" + p); },
		distPath = function(p) { return path.normalize(__dirname + "/dist/" + p); },

		noPolyfills = grunt.option("no-polyfills") || false,

		minJsFile = distPath('imgix.min.js'),
		jsFile = distPath('imgix.js');

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
			my_target: {
				files: [{
					src: jsFile,
					dest: minJsFile
				}]
			}
		},

		concat: {
			options: {
				stripBanners: true,
				banner: '/*! imgix.js http://www.imgix.com <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n"
			},
			js: {
				src: [
					srcPath('prefix.js'),
					srcPath('polyfills.js'),
					srcPath('core.js'),
					srcPath('suffix.js')
				],
				dest: jsFile
			},

			nopolyjs: {
				src: [
					srcPath('prefix.js'),
					//srcPath('polyfills.js'),
					srcPath('core.js'),
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
			}
		},

		jsdoc2md: {
			oneOutputFile: {
				src: "dist/imgix.js",
				dest: "docs.md",
				options: {
					index: false
				}
			}

		}
	});


	grunt.registerTask('test', 'run tests', function() {
		var configPath = path.join(__dirname, '/tests/config.js');
		if (!fs.existsSync(configPath)) {
			throw grunt.util.error("\n\nconfig.js does not exist. Required for tests! (signing)\n");
		} else {
			grunt.task.run(['build', 'karma']);
		}
	});

	grunt.registerTask('doc-cleanup', 'clean up output', function() {
		var contents = fs.readFileSync('docs.md', 'UTF-8');

		contents = contents.split('<a name="imgix"></a>')[1];

		contents = contents.replace(/uRL/g, 'URL');

		contents = contents.replace('#imgix', '#imgix.js Documentation'); // only first

		contents = "![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)\n\n" + contents;

		contents = "<!--- THIS IS AUTO GENERATED FROM JSDOCS. DO NOT EDIT DIRECTLY. ---> \n\n" + contents;

		fs.writeFileSync('docs.md', contents);
	});

	grunt.registerTask('builddocs', 'build the docs', function() {
		grunt.task.run(['build', 'jsdoc2md', 'doc-cleanup']);
	});

	grunt.registerTask('build', 'build everything', function() {
		if (noPolyfills) {
			grunt.task.run(['concat:nopolyjs', 'uglify']);
		} else {
			grunt.task.run(['concat:js', 'uglify']);
		}
	});

	// Default task.
	grunt.registerTask('default', 'build');

	// load all our build dependencies 
	grunt.loadNpmTasks("grunt-jsdoc-to-markdown");
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
};
