/* jshint node: true */
module.exports = function (grunt) {
    "use strict";
    var pkg = grunt.file.readJSON("package.json");

    // Calculate and write version number.
    var now = (new Date()).getTime().toString();
    pkg.version = now.substr(0, 4) + "." + now.substr(4, 4) + "." + now.substr(8);
    grunt.file.write("package.json", JSON.stringify(pkg, null, 4));

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
        require("./build/release.test.js");
    });

    // Load the required plugins.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default task(s).
    grunt.registerTask("default", ["jshint", "concat", "uglify", "test"]);
};