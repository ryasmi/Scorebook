module.exports = function( grunt ) {
  grunt.initConfig({
    min: {
      "release": {
        src: ["src/intro.js", "src/core.js"],
        dest: "lib/release.min.js"
      },
      "test": {
        src: ["src/core.js", "src/testing.js"],
        dest: "lib/test.min.js"
      }
    }
  });

  // Default grunt
  grunt.registerTask("default", ["min:release"]);

  // Short list as a high frequency watch task
  grunt.registerTask("dev", ["min:test"]);
};