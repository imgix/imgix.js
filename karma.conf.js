// Karma configuration

module.exports = function(config) {
  config.set({
	basePath: '',
	browsers: ['PhantomJS'],
	reporters: ['progress'],
	singleRun: true,
    frameworks: ['jasmine'],
		files: [
		'imgix.min.js', // TO TEST
		'tests/test.js'
	],
  });
};
