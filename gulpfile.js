var gulp = require('gulp'),
    browserify = require('browserify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var paths = {
  test: __dirname + '/test/**/*.js',
  js: __dirname + '/src/**/*.js',
  jsEntry: __dirname + '/src/imgix.js',
}

gulp.task('default', function() {

});
