module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Lists of files to be minified with UglifyJS, used by the "min" task.
    min: {
      "release": {
        src: ["library/intro.js", "library/core.js"],
        dest: "release.min.js"
      },
      "test": {
        src: ["library/core.js", "library/testing.js"],
        dest: "test.min.js"
      }
    },
    // Global configuration options for UglifyJS.
    uglify: {
      mangle: {toplevel: true},
      squeeze: {dead_code: false},
      codegen: {quote_keys: true}
    }
  });
};