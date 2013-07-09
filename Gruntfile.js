/* jshint node: true */
module.exports = function (grunt) {
    'use strict';
    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                banner: grunt.file.read('src/banner.txt') + '\n'
            },
            build: {
                src: 'build/release.min.js',
                dest: 'build/release.min.js'
            },
            test: {
                src: 'build/release.test.js',
                dest: 'build/release.test.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'build/release.min.js'
            },
            test: {
                src: ['test/**/*.js'],
                dest: 'build/release.test.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    // Load the required plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Custom task for running test files.
    grunt.registerTask('test', function () {
        require('./build/release.test.js');
    });

    var setVersion = function (fn) {
        pkg.version = fn(pkg.version.split('.'));
        grunt.file.write('package.json', JSON.stringify(pkg, null, 4));
        grunt.task.run(['jshint', 'concat', 'uglify', 'test']);
    };

    grunt.registerTask('default', function () {
        setVersion(function (version) {
            return version[0] + '.' + version[1] + '.' + (Number(version[2]) + 1);
        });
    });

    grunt.registerTask('minor', function () {
        setVersion(function (version) {
            return version[0] + '.' + (Number(version[1]) + 1) + '.0';
        });
    });

    grunt.registerTask('major', function () {
        setVersion(function (version) {
            return (Number(version[0]) + 1) + '.0.0';
        });
    });
};