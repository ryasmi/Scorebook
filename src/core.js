/* jshint -W072 */
(function (scope) {
    "use strict";

    var resembles = function (needle, haystack) {
        var self = needle;
        var keys = Object.keys(self);
        var len = keys.length;
        var key = 0;

        return (function check() {
            if (self[keys[key]] === haystack[keys[key]]) {
                key += 1;
                return (key <= len) ? check() : true;
            }
            return false;
        }());
    };

    var appendTo = function (parentList, sbList, obj) {
        var parent = parentList[parentList.length - 1];
        obj.id = sbList.length;
        obj.parent = parent;
        obj.children = [];
        parent.children.push(obj);
        sbList.push(obj);
    };

    var getFrom = function (list, obj) {
        var len = list.length - 1;
        var matches = [];

        (function check(item) {
            if (resembles(obj, list[item])) {
                matches.push(list[item]);
            }
            if (item < len) {
                check(item + 1);
            }
        }(0));

        return matches;
    };

    var Scorebook = function () {
        var self = this;
        var innings = [];
        var overs = [];
        var balls = [];
        var wickets = [];

        self.addInnings = function (battingTeam) {
            appendTo([{children: []}], innings, {
                "battingTeam": battingTeam
            });
            return self;
        };

        self.addOver = function (bowler) {
            appendTo(innings, overs, {
                "bowler": bowler
            });
            return self;
        };

        self.addBall = function (batsman, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, batPen, bwlPen) {
            appendTo(overs, balls, {
                "batsman": batsman,
                "runs": Number(runs),
                "wideBall": Boolean(wideBall),
                "noBall": Boolean(noBall),
                "byes": Boolean(byes),
                "legByes": Boolean(legByes),
                "wagonX": Number(wagonX),
                "wagonY": Number(wagonY),
                "pitchX": Number(pitchX),
                "pitchY": Number(pitchY),
                "batPen": Number(batPen),
                "bwlPen": Number(bwlPen),
                "dateTime": new Date()
            });
            return self;
        };

        self.addWicket = function (batsman, howOut, fielder) {
            appendTo(balls, wickets, {
                "batsman": batsman,
                "howOut": howOut,
                "fielder": fielder
            });
            return self;
        };

        self.getInnings = function (inning) {
            return getFrom(innings, inning);
        };

        self.getOvers = function (over) {
            return getFrom(overs, over);
        };

        self.getBalls = function (ball) {
            return getFrom(balls, ball);
        };

        self.getWickets = function (wicket) {
            return getFrom(wickets, wicket);
        };

        self.undo = function () {
            // Determine which list should be popped.
            var lastWicket = wickets[wickets.length - 1] || {parent: null};
            var lastBall = balls[balls.length - 1] || {parent: null};
            var lastOver = overs[overs.length - 1] || {parent: null};
            var lastInning = innings[innings.length - 1] || {parent: null};
            var list = lastWicket.parent === lastBall ? [wickets, lastBall] : (lastBall.parent === lastOver ? [balls, lastOver] : (lastOver.parent === lastInning ? [overs, lastInning] : [innings, {children: [lastInning]}]));

            // Pop an item off the selected list.
            list[1].children.pop();
            list[0].pop();
            return self;
        };

        self.data = {
            innings: innings,
            overs: overs,
            balls: balls,
            wickets: wickets
        };

        return self;
    };

    scope.scorebook = function () {
        return new Scorebook();
    };
}(this));