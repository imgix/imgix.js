"use strict";
module.exports = function(grunt) {

	var path = require('path'),
		exec = require('child_process').exec,
		srcPath = function(p) { return path.normalize(__dirname + "/src/" + p); },
		rootPath = function(p) { return path.normalize(__dirname + "/" + p); },
		minJsFile = rootPath('imgix.min.js'),
		jsFile = srcPath('imgix.js');

	function execRun(cmd) {
		exec(cmd, function(err, stdout, stderr) {
			if (err) {
				grunt.fail.fatal(stderr + ' ' + stdout + ' ' + err);
			}
			console.log(stdout);
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
		}

		// concat: {
		// 	js: {
		// 		src: [],
		// 		dest: releaseJsFile
		// 	}
		// }
	});

	grunt.registerTask('test', 'run tests', function() {
		grunt.task.run(['build', 'karma']);
	});

	grunt.registerTask('build', 'build everything', function() {
		grunt.task.run(['uglify']);
	});

	// Default task.
	grunt.registerTask('default', 'build');

	// load all our build dependencies 
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');

};
