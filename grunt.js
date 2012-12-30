module.exports = function( grunt ) {
  grunt.initConfig({
    min: {
      "release": {
        src: ["lib/intro.js", "lib/core.js"],
        dest: "src/release.min.js"
      },
      "test": {
        src: ["lib/core.js", "lib/testing.js"],
        dest: "src/test.min.js"
      }
    }
  });

  // Default grunt
  grunt.registerTask("default", ["min:release"]);

  // Short list as a high frequency watch task
  grunt.registerTask("dev", ["min:test"]);
};