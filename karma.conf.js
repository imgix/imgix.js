// Karma configuration

module.exports = function(config) {
  config.set({
	basePath: '',
	browsers: ['Firefox', 'Chrome', 'PhantomJS'],
	reporters: ['progress'],
	singleRun: true,
    frameworks: ['jasmine'],
		files: [
		'config.js', // has token and other config
		//'dist/imgix.min.js', // TO TEST
		'dist/imgix.js',
		'tests/test.js'
	]
  });
};
