'use strict';

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('config/assets.json'),
        watch: {
            coffee: {
                files: ['public/coffee/**/*.coffee', 'app/**/*.coffee'],
                tasks: ['coffeelint:dev', 'coffee:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            js: {
                files: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/app/**/*.js', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: ['public/app/**/*.html', 'app/views/**'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['public/sass/**/*.scss'],
                tasks: ['sass:dev', 'csslint:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            css: {
                files: ['public/css/**/*.css'],
                tasks: ['csslint:dev'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/app/**/*.js', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            production: {
                files: '<%= assets.js %>'
            }
        },
        coffee: {
            dev: {
                options: {
                    bare: true
                },
                expand: true,
                cwd: 'public/coffee/',
                src: ['**/*.coffee'],
                dest: 'public/app/',
                ext: '.js'
            }

        },
        coffeelint: {
            options: {
                force: true,
                configFile: '.coffeelintrc'
            },
            dev: {
                src: ['public/coffee/**/*.coffee', 'app/**/*.coffee']
            }
        },
        sass: {

            options: {
                compass: true,
                loadPath: ['public/lib/bootstrap-sass-official/vendor/assets/stylesheets']
            },
            dev: {
                options: {
                    sourcemap: true,
                    quiet: true
                },

                expand: true,
                cwd: 'public/sass/',
                src: ['**/*.scss'],
                dest: 'public/css/',
                ext: '.css'

            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    noLineComments: true
                }
            }
        },
        csslint: {
            dev: {
                src: ['public/css/**/*.css']
            },
            options: {
                csslintrc: '.csslintrc'
            }
        },
        cssmin: {
            combine: {
                files: '<%= assets.css %>'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html,coffee,json',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.event.on('watch', function(action, filepath) {
        var ext = filepath.match(/\..+$/)[0],
            replacer;

        switch (ext) {
            case '.js':
                grunt.config('jshint.all.src', filepath);
                break;
            case '.coffee':
                replacer = function(match, p1) {
                    return p1 + '.js';
                };

                grunt.config('coffeelint.dev.src', filepath);
                grunt.config('coffee.dev.src', filepath.replace('public/coffee/', ''));
                //grunt.config('jshint.all.src', filepath.replace(/public\/coffee\/(.+)\.coffee$/, replacer));
                break;
            case '.scss':
                replacer = function(match, p1) {
                    return 'public/css/' + p1 + '.css';
                };
                grunt.config('sass.dev.src', filepath.replace('public/sass/', ''));
                grunt.config('csslint.dev.src', filepath.replace(/public\/sass\/(.+)\.scss/, replacer));
                break;
            case '.css':
                grunt.config('csslint.dev.src', filepath);
                break;
        }
    });

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['jshint', 'compass', 'csslint', 'cssmin', 'uglify', 'concurrent']);
    } else {
        grunt.registerTask('default', ['coffee:dev', 'sass:dev', 'concurrent']);
    }

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};
