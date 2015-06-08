// Karma configuration

module.exports = function(config) {
	config.set({
		basePath: '',
		browsers: ['Firefox', 'Chrome', 'Safari'],
		reporters: ['progress'],
		singleRun: true,
		frameworks: ['jasmine'],
		files: [
			'dist/imgix.min.js',
			'node_modules/lodash/index.js',
			'tests/test.js'
		]

	});
};
