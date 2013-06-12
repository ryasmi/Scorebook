(function (window, console) {
    "use strict";
    var Assert = function () {
        var self = this;
        var tests = 0;
        var failed = 0;

        self.logSuccess = false;
        self.equal = function (val1, val2, msg) {
            tests += 1;

            if (val1 !== val2) {
                failed += 1;
                console.warn("Test " + tests + " failed." + (msg ? " " + msg + " was not successful." : ""));
            } else if (self.logSuccess) {
                console.log("Test " + tests + " passed." + (msg ? " " + msg + " was succesful." : ""));
            }
        };
        self.passed = function () {
            return tests - failed;
        };
        self.failed = function () {
            return failed;
        };
        self.tests = function () {
            return tests;
        };
        self.toString = function () {
            return (tests - failed) + "/" + tests + " tests were passed.";
        };
        self.result = function () {
            console[(failed === 0) ? "log" : "warn"](self.toString());
            return failed === 0;
        };

        return self;
    };

    window.assert = function () {
        return new Assert();
    };
}(this, this.console));