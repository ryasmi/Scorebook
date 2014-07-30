/* jshint -W072 */
(function (scope, Number, Boolean) {
    'use strict';

    var slice = function (args) {
        return Array.prototype.slice.call(args, 0);
    };

    var resembles = function (haystack) {
        var keys = Object.keys(haystack);
        var len = keys.length;

        return function (needle) {
            var key = 0;

            while (key <= len && needle[keys[key]] === haystack[keys[key]]) {
                key += 1;
            }

            return key > len;
        };
    };

    var appendTo = function (retObj, parentList, sbList, parse) {
        parse = parse || function (obj) {return obj; };

        return function () {
            var parent = parentList[parentList.length - 1];
            var obj = parse.apply({}, slice(arguments));
            obj.id = sbList.length;
            obj.parent = parent;
            obj.children = [];
            parent.children.push(obj);
            sbList.push(obj);
            return retObj;
        };
    };

    var getFrom = function (list) {
        return function (obj) {
            return list.filter(resembles(obj));
        };
    };

    var nanToNumber = function (value) {
        var value = Number(value);
        return isNaN(value) ? 0 : value;
    };

    var Scorebook = function () {
        var self = this;

        self.innings = [];
        self.overs = [];
        self.balls = [];
        self.wickets = [];

        self.addInnings = appendTo(self, [{children: []}], self.innings, function (battingTeam) {
            return {
                'battingTeam': battingTeam
            };
        });

        self.addOver = appendTo(self, self.innings, self.overs, function (bowler) {
            return {
                'bowler': bowler
            };
        });

        self.addBall = appendTo(self, self.overs, self.balls, function (runs, batsman, opts) {
            opts = opts || {};

            return {
                'batsman': batsman || self.balls[self.balls.length - 1].batsman,
                'runs': nanToNumber(runs),
                'wideBall': Boolean(opts.wideBall),
                'noBall': Boolean(opts.noBall),
                'byes': Boolean(opts.byes),
                'legByes': Boolean(opts.legByes),
                'wagonX': nanToNumber(opts.wagonX),
                'wagonY': nanToNumber(opts.wagonY),
                'pitchX': nanToNumber(opts.pitchX),
                'pitchY': nanToNumber(opts.pitchY),
                'batPen': nanToNumber(opts.batPen),
                'bwlPen': nanToNumber(opts.bwlPen),
                'dateTime': new Date()
            };
        });

        self.addWicket = appendTo(self, self.balls, self.wickets, function (howOut, batsman, fielder) {
            return {
                'batsman': batsman || self.balls[self.balls.length - 1].batsman,
                'howOut': howOut,
                'fielder': fielder
            };
        });

        self.getInnings = getFrom(self.innings);
        self.getOvers = getFrom(self.overs);
        self.getBalls = getFrom(self.balls);
        self.getWickets = getFrom(self.wickets);

        self.undo = function () {
            // Determine which list should be popped.
            var lastWicket = self.wickets[self.wickets.length - 1] || {parent: null};
            var lastBall = self.balls[self.balls.length - 1] || {parent: null};
            var lastOver = self.overs[self.overs.length - 1] || {parent: null};
            var lastInning = self.innings[self.innings.length - 1] || {parent: null};
            var list = lastWicket.parent === lastBall ? [self.wickets, lastBall] : (lastBall.parent === lastOver ? [self.balls, lastOver] : (lastOver.parent === lastInning ? [self.overs, lastInning] : [self.innings, {children: [lastInning]}]));

            // Pop an item off the selected list.
            list[1].children.pop();
            list[0].pop();
            return self;
        };

        return self;
    };

    var constructor = function () {
        return new Scorebook();
    };

    // AMD Support.
    if (typeof scope.define === 'function') {
        scope.define('scorebook', [], function () {
            return constructor;
        });
    } else {
        scope.scorebook = constructor;
    }
}(this, Number, Boolean));
