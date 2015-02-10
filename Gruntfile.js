'use strict';

module.exports = function(grunt){

	grunt.initConfig({
		jshint: {
			all: {
				src: ['app/**/*.js', 'server.js']
			}
		},

		watch: {
			all: {
				files: ['app/**/*.js', 'server.js', 'Gruntfile.js'],
				tasks: ['default']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
};