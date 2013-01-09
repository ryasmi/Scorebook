module.exports = function(grunt) {
  // Variables and Shortcuts.
  var i, files, buildFile,
    params = grunt.file.readJSON("params.json"),
    buildDirectory = params.grunt.buildDirectory,
    sourceDirectory = params.grunt.sourceDirectory,
    version = incrementVersion();

  function incrementVersion() {
    // Increment version numbers.
    params.version.build = params.version.build > 49 ? 0 : params.version.build + 1;
    params.version.minor = params.version.build === 0 ? (params.version.minor > 8 ? 0 : params.version.minor + 1) : params.version.minor;
    params.version.major = params.version.minor === 0 ? params.version.major + 1 : params.version.major;

    // Rewrite the params file to contain the updated version numbers.
    grunt.file.write("params.json", JSON.stringify(params));

    // major.minor.build
    return [params.version.major, params.version.minor, params.version.build].join(".");
  }

  function replaceParams(files, startDirectory, endDirectory) {
    var i, compiled,
      date = new Date();

    // For each file in files replace the params.
    for (i = 0; i < files.length; i += 1) {
      compiled = grunt.file.read(startDirectory + files[i])
        .replace(/@TITLE/g, params.title)
        .replace(/@LICENCE-URL/g, params.licence.url)
        .replace(/@LICENCE/g, params.licence.type)
        .replace(/@VERSION/g, version)
        .replace(/@AUTHOR/g, params.author)
        .replace(/@YEAR/g, date.getFullYear())
        .replace(/@DATE/g, [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("."));

      // Write concatenated source to file.
      grunt.file.write(endDirectory + files[i], compiled);
    }
  }

  function prefixDirectory(directory, files) {
    var i,
      prefixed = [];

    for (i = 0; i < files.length; i += 1) {
      prefixed.push(directory + files[i]);
    }

    return prefixed;
  }

  grunt.registerTask("release", function () {
    replaceParams(["copyright.js"], "info/", "build/");
    replaceParams(params.grunt.infoFiles, "info/", "");
    files = prefixDirectory(sourceDirectory, params.grunt.releaseFiles);
    buildFile = params.grunt.buildDirectory + params.title + ".min.js";
  });

  grunt.registerTask("testing", function () {
    files = prefixDirectory(sourceDirectory, params.grunt.devFiles);
    buildFile = params.grunt.buildDirectory + "testing.min.js";
  });

  grunt.registerTask("init-config", function () {
    // Grunt config. Carries out minification and concatenation.
    grunt.initConfig({
      min: {
        "all": {
          src: files,
          dest: buildFile
        }
      },
      concat: {
        "release": {
          src: [buildDirectory + "/copyright.js", buildFile],
          dest: buildFile
        }
      }
    });
  });

  // Grunt shortcuts.
  grunt.registerTask("default", ["release", "init-config", "min:all", "concat:release"]);
  grunt.registerTask("dev", ["testing", "init-config", "min:all"]);
  grunt.registerTask("validate", []);
};