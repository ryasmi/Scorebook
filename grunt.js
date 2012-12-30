module.exports = function( grunt ) {
  grunt.initConfig({
    min: {
      "release": {
        src: ["lib/core.js"],
        dest: "src/release.min.js"
      },
      "test": {
        src: ["lib/core.js", "lib/testing.js"],
        dest: "src/test.min.js"
      }
    },
    concat: {
      "release": {
        src: ["src/copyright.js", "src/release.min.js"],
        dest: "src/release.min.js"
      }
    }
  });

  // Adds date and version.
  grunt.registerTask("date-version", function () {
    // src: github/jQuery/jQuery/Gruntfile.js @jQuery.
    info = grunt.file.readJSON("lib/info.json");
    compiled = grunt.file.read("lib/intro.js");
    compiled = compiled.replace(/@VERSION/g, info.version).replace("@DATE", function () {
      var date = new Date();

      // YYYY-MM-DD
      return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ].join("-");
    });

    // Write concatenated source to file
    grunt.file.write("src/copyright.js", compiled);
  });

  // Default grunt
  grunt.registerTask("default", ["min:release", "date-version", "concat:release"]);

  // Short list as a high frequency watch task
  grunt.registerTask("dev", ["min:test"]);
};