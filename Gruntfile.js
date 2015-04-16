'use strict';

// grunt --dev
// grunt --dist
// grunt build --dev
// grunt build --dist

module.exports = function(grunt){
	
	var mode = grunt.option('dist') ? 'dist' : 'dev';

	grunt.initConfig({
		jshint: {
			options: {
				ignores: ['app/public/js/bundle.js', 'app/public/js/MyRaisedButton.js', 'app/public/js/index.js']
			},
			all: {
				src: ['app/**/*.js', 'server.js']
			}
		},

		browserify: {
			dev: {
				options: {
					watch: true, // use watchify for incremental builds!
					keepAlive: true,
					debug: true,
					transform: ['babelify']
				},
				src: ['app/public/js/index.js'],
				dest: 'app/public/js/bundle.js'
			},
			dist: {
				options: {
					debug: false,
					transform: ['babelify']
				},
				src: ['<%= browserify.dev.src%>'],
				dest: '<%= browserify.dev.dest%>'
			}
		},

		/*
		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				src: ['app/public/css/main.scss'],
				dest: 'app/public/css/main.css'
			}
			dist: {
				options: {
					style: 'expanded'
				},
				src: '<%=sass.dev.src%>',
				dest: '<%=sass.dev.dest%>',
			}
		},
		*/

		less: {
			dev: {
				src: ['app/public/css/main.less'],
				dest: 'app/public/css/main.css'
			},
			dist: {
				src: '<%=sass.dev.src%>',
				dest: '<%=sass.dev.dest%>',
			}
		},

		watch: {
			css: {
				files: ['app/**/*.less'],
				tasks: ['less:' + mode]
			},
			/*
			rest: {
				files: ['Gruntfile.js'],
				tasks: ['default']
			}
			*/
		},

		concurrent: {
			dev: {
				options: {
					logConcurrentOutput: true
				},
				tasks: ['browserify:' + mode, 'watch:css']
			},
			dist: {
				options: {
					logConcurrentOutput: true
				},
				tasks: ['browserify:' + mode, 'watch:css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-concurrent');

	// linting and others (currently none as jshint doesn't support jsx yet (in my implementation))
	grunt.registerTask('preTasks', []);

	// building and concurrent tasks
	grunt.registerTask('build', ['preTasks', 'concurrent:' + mode]);

	grunt.registerTask('default', ['build']);

};
