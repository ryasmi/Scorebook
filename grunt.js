module.exports = function(grunt) {

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

  // Incrementing the version.
  grunt.registerTask("incrementVersion", function () {
    incrementVersion();
  });

  function incrementVersion() {
    // Get the info file.
    var infoFile = "lib/info.json",
      info = grunt.file.readJSON(infoFile);

    // Increment version.
    info.version.build = info.version.build > 49 ? 0 : info.version.build + 1;
    info.version.minor = info.version.build === 0 ? (info.version.minor > 8 ? 0 : info.version.minor + 1) : info.version.minor;
    info.version.major = info.version.minor === 0 ? info.version.major + 1 : info.version.major;
    grunt.file.write(infoFile, JSON.stringify(info));

    // major.minor.build
    return [
      info.version.major,
      info.version.minor,
      info.version.build
    ].join(".");
  }

  // Adds date and version.
  grunt.registerTask("date-version", function () {
    // src: github/jQuery/jQuery/Gruntfile.js @jQuery.
    compiled = grunt.file.read("lib/intro.js");
    compiled = compiled.replace(/@VERSION/g, incrementVersion()).replace("@DATE", function () {
      var date = new Date();

      // YYYY.MM.DD
      return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ].join(".");
    });

    // Write concatenated source to file.
    grunt.file.write("src/copyright.js", compiled);
  });

  // Default grunt.
  grunt.registerTask("default", ["min:release", "date-version", "concat:release"]);

  // Short list as a high frequency watch task.
  grunt.registerTask("dev", ["min:test", "incrementVersion"]);
};