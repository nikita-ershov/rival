// Обязательная обёртка
module.exports = function (grunt) {
    "use strict";
    // Задачи
    grunt.initConfig({
        stylus: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    'static/dist/css/style.css': [
                        'static/blocks/layout/*.styl',
                        'static/elements/*.styl',
                        'static/blocks/**/*.styl'
                    ]
                }
            }
        },
        
        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
                },

                src: 'static/dist/css/style.css'
            }
        },

        cssmin: {
            minify: {
				files: [{
                    expand: true,
                    cwd: 'static/dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'static/dist/css/',
                    ext: '.min.css'
                }]
			}
        },
        
        copy: {
            images: {
                expand: true,
                cwd: 'static/blocks/',
                src: ['**/images/*'],
                dest: 'static/dist/images/',
                flatten: true,
                filter: 'isFile'
			},
            fonts: {
                expand: true,
                cwd: 'static/fonts/',
                src: ['*'],
                dest: 'static/dist/fonts/',
                flatten: true,
                filter: 'isFile'
			},
            csslibs: {
                expand: true,
                cwd: 'static/libs/css/',
                src: ['*'],
                dest: 'static/dist/css/',
                flatten: true,
                filter: 'isFile'
			},
            jslibs: {
                expand: true,
                cwd: 'static/libs/js/',
                src: ['*'],
                dest: 'static/dist/js/',
                flatten: true,
                filter: 'isFile'
			},
            final: {
                files: [
                      // includes files within path
                      {
                          cwd: 'static/',
                          src: 'dist/**',
                          dest: 'final/',
                          expand: true
                      },
                      // flattens results to a single level
                      {
                          src: ['static/*'],
                          dest: 'final/',
                          filter: 'isFile',
                          expand: true,
                          flatten: true,
                      },
                 ],
            }
        },
        
        watch: {
            options: {
                reload: true
            },
            src: {
                files: ['static/elements/*.styl', 'static/blocks/**/*.styl', 'static/blocks/**/*.js', 'static/*.html'],
                tasks: ['default']
            }
        },

        jscs: {
            src: "static/blocks/**/*.js",
            options: {
                config: true,
                requireCurlyBraces: [ "if" ]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc' // relative to Gruntfile
            },
            // You get to make the name
            // The paths tell JSHint which files to validate
            myFiles: ['static/blocks/**/*.js']
        },
        concat: {
			options: {
				separator: ';'
			},
			all: {
				src: ['static/blocks/**/*.js'],
				dest: 'static/dist/js/script.js'
			}
        },
        uglify: {
            all: {
                files: {
                    // Результат задачи concat
                    'static/dist/js/script.min.js': '<%= concat.all.dest %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-jscs");
    
    grunt.registerTask('default', ['stylus', 'autoprefixer', 'cssmin', "concat", "uglify", "copy:images", "copy:fonts", "copy:csslibs", "copy:jslibs"]);
        
    grunt.registerTask('js', ['jscs', 'jshint']);
    
    grunt.registerTask("final", ["copy:final"]);
};