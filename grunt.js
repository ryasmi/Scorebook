module.exports = function(grunt) {
  // Global variables.
  var dir = {
    "source" : "src",
    "build" : "build"
  },
    infoFile = dir.source + "/info.json",
    releaseFile = "/scorebook.min.js";


  // Grunt config.
  grunt.initConfig({
    min: {
      "release": {
        src: [dir.source + "/core.js"],
        dest: dir.build + releaseFile
      },
      "test": {
        src: [dir.source + "/core.js", dir.source + "/testing.js"],
        dest: dir.build + "/test.min.js"
      }
    },
    concat: {
      "release": {
        src: [dir.build + "/copyright.js", dir.build + releaseFile],
        dest: dir.build + releaseFile
      }
    }
  });


  // Incrementing the version.
  grunt.registerTask("incrementVersion", function () {
    incrementVersion(grunt.file.readJSON(dir.source + "/info.json"));
  });


  function incrementVersion(info) {
    // Increment version numbers.
    info.version.build = info.version.build > 49 ? 0 : info.version.build + 1;
    info.version.minor = info.version.build === 0 ? (info.version.minor > 8 ? 0 : info.version.minor + 1) : info.version.minor;
    info.version.major = info.version.minor === 0 ? info.version.major + 1 : info.version.major;

    // Rewrite the info file to contain the updated version numbers.
    grunt.file.write(infoFile, JSON.stringify(info));

    // major.minor.build
    return [info.version.major, info.version.minor, info.version.build].join(".");
  }


  // Adds date and version.
  grunt.registerTask("date-version", function () {
    // src: github/jQuery/jQuery/Gruntfile.js @jQuery.
    var comiled;
      info = grunt.file.readJSON(dir.source + "/info.json"),
      date = new Date();

    // Replace placeholders.
    compiled = grunt.file.read(dir.source + "/intro.js")
      .replace(/@VERSION/g, incrementVersion(info))
      .replace(/@AUTHOR/g, info.author)
      .replace(/@YEAR/g, date.getFullYear())
      .replace(/@DATE/g, [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("."));

    // Write concatenated source to file.
    grunt.file.write(dir.build + "/copyright.js", compiled);
  });


  // Grunt shortcuts.
  grunt.registerTask("default", ["min:release", "date-version", "concat:release"]);
  grunt.registerTask("dev", ["min:test", "incrementVersion"]);
};