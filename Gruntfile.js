"use strict";
module.exports = function(grunt) {

	var path = require('path'),
		fs = require('fs'),
		path = require('path'),
		exec = require('child_process').exec,
		srcPath = function(p) { return path.normalize(__dirname + "/src/" + p); },
		rootPath = function(p) { return path.normalize(__dirname + "/" + p); },
		minJsFile = rootPath('imgix.min.js'),
		jsFile = srcPath('imgix.js');

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

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		// concat: {
		// 	js: {
		// 		src: [],
		// 		dest: releaseJsFile
		// 	}
		// }
	});

	grunt.registerTask('closure-minify', 'minify', function() {
		// --compilation_level ADVANCED_OPTIMIZATIONS is actually 30% bigger!
		var cmd = "java -jar ./bin/closure_compiler.jar  --language_in=ECMASCRIPT5 --js " + jsFile + " --js_output_file " + minJsFile,
			done = this.async();

		execRun(cmd, done);
	});

	grunt.registerTask('test', 'run tests', function() {
		var configPath = path.join(__dirname, 'config.js');
		if (!fs.existsSync(configPath)) {
			throw grunt.util.error("\n\nconfig.js does not exist. Required for tests! (signing)\n");
		} else {
			grunt.task.run(['build', 'karma']);
		}
	});

	grunt.registerTask('builddocs', 'build the docs', function() {
		var docsPath = path.join(__dirname, 'docs');
		if (fs.existsSync(docsPath)) {
			grunt.file.delete(docsPath);
		}

		grunt.file.mkdir(docsPath);
		// npm install git+https://github.com/jsdoc3/jsdoc.git
		var cmd = ' ./node_modules/.bin/jsdoc --private src/imgix.js -d ./docs';
		execRun(cmd);
	});

	grunt.registerTask('build', 'build everything', function() {
		//grunt.task.run(['uglify']);
		grunt.task.run(['closure-minify']);
	});

	// Default task.
	grunt.registerTask('default', 'build');

	// load all our build dependencies 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');
};
