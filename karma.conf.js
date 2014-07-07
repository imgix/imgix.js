// Karma configuration

module.exports = function(config) {
  config.set({
	basePath: '',
	browsers: ['PhantomJS', 'Firefox', 'Chrome'],
	//browsers: ['Firefox'],
	reporters: ['progress'],
	singleRun: true,
    frameworks: ['jasmine'],
		files: [
		'config.js', // has token and other config
		'imgix.min.js', // TO TEST
		'tests/test.js'
	],
  });
};
