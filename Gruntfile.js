/* jshint node: true, -W061 */
module.exports = function (grunt) {
    "use strict";
    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                banner: grunt.file.read("src/banner.txt") + "\n"
            },
            build: {
                src: "build/release.min.js",
                dest: "build/release.min.js"
            },
            test: {
                src: "build/release.test.js",
                dest: "build/release.test.js"
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["src/**/*.js"],
                dest: "build/release.min.js"
            },
            test: {
                src: ["test/**/*.js"],
                dest: "build/release.test.js"
            }
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        }
    });

    // Custom task for running test files.
    grunt.registerTask("test", function () {
        // Create console.
        this.console = {};
        this.console.log = grunt.log.oklns;
        this.console.warn = grunt.fail.warn;

        // Run code with tests.
        eval(grunt.file.read("build/release.min.js"));
        eval(grunt.file.read("build/release.test.js"));
    });

    // Load the required plugins.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default task(s).
    grunt.registerTask("default", ["jshint", "concat", "uglify", "test"]);
};