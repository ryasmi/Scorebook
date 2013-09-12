/* jshint node: true */
module.exports = function (grunt) {
    'use strict';
    var srcFiles = 'src/**/*.js';
    var testFiles = 'test/**/*.js';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: grunt.file.read('src/banner.txt') + '\n'
            },
            build: {
                src: '<%= pkg.main %>',
                dest: '<%= pkg.main %>'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            source: {
                src: srcFiles,
                dest: '<%= pkg.main %>'
            }
        },
        jshint: {
            files: ['Gruntfile.js', srcFiles, testFiles],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        simplemocha: {
            options: {
                globals: ['chai'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            test: {
                src: testFiles
            }
        }
    });

    // Load the required plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Tasks.
    grunt.registerTask('default', ['simplemocha', 'jshint', 'concat', 'uglify']);
};