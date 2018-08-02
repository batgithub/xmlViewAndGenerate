module.exports = function(grunt){

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	//lancement de toutes les tâches sans avoir à les lister
    require('load-grunt-tasks')(grunt);

	//création des têches
	grunt.initConfig({	//initialisation de l'ensemble des tâches


        sass: {                              // Task
            dev: {                            // Target
                files: {                         // Dictionary of files
                    'dev/style.css': 'dev/sass/style.scss'
                },
                options: {
                    update: true,
                    sourcemap: 'auto'

                }
            },
            dist: {                            // Target
                files: {                         // Dictionary of files
                    'dist/style.css': 'dev/sass/style.scss'
                },
                options: {
                    update: true,
                    sourcemap: 'none',
                    style:'nested'

                }
            }
        },
        // copy: {
        //   main: {
        //     files: [
        //       // includes files within path
        //       {
        //         expand: true,
        //         cwd:'dev',
        //         src: [''],
        //         dest: 'dist/',
        //         filter: 'isFile'
        //       },
        //     ],
        //   },
        // },
        autoprefixer: {
            dist :{
                files: {
                    // Target-specific file lists and/or options go here.
                    'dist/style.css':'dev/style.css',
                }
            }
        },
        // Project configuration.

        uglify: {
          dev: {
            files: {
              'dev/app.js': ['dev/js/jquery.js','app-source.js']
            }
          },
          dist: {
            files: {
              'dist/app.js': [
                'dev/js/jquery.js',
                'dev/js/clipboard.js',
                'dev/js/moment.js',
                'dev/js/highlight.js',
                'dev/js/feed.js',
                'dev/js/form.js',
                'dev/js/render.js',
              ]
            }
          }
        },

        watch: {
		       options: {
      		        livereload: true,
	        },
            html: {
                files: ['**/*.html']
            },
            sass: {
                files: ['dev/sass/**/*.scss'],
                tasks: ['sass:dev'],
                options: { spawn: false }
            },
            js: {
              files: ['dev/js/**/*.js']
            },
            grunt: {
                files: ['gruntfile.js'],
            }
        }

	});

	//lanceur de tâche
	grunt.registerTask('default', ['sass:dev','watch']);
  grunt.registerTask('deploy', ['sass:dist','autoprefixer','uglify:dist']);




};
