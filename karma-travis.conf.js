// Karma configuration

module.exports = function(config) {
	config.set({
		basePath: '',
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		singleRun: true,
		frameworks: [
				'jasmine',
				'jasmine-matchers'
			],
		files: [
			'dist/imgix.min.js',
			'node_modules/lodash/index.js',
			'tests/*.js'
		]
	});
};
