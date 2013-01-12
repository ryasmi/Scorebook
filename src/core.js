var Scorebook = function (data) {
    "use strict";
    var d = data;

    // Check if any data is not defined and define it as an empty list.
    d = d || {};
    d.innings = d.innings || [];
    d.overs = d.overs || [];
    d.balls = d.balls || [];
    d.wickets = d.wickets || [];

    // Duck Typing functions.
    function testInt(value) {
        // src: stackoverflow/questions/4514602/type-checking-in-javascript @Quentin.
        return ((typeof value === "number") && (Math.floor(value) === value)) ? (value || 0) : 0;
    }

    function testBool(value) {
        return ((value === true) || (value === false)) ? (value || false) : false;
    }

    function testDate(value) {
        // src: stackoverflow/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript @Borgar.
        return (Object.prototype.toString.call(value) === "[object Date]") ? (isNaN(value.getTime()) ? null : value) : null;
    }

    // Push/Add/Create functions.
    function pushInning(battingTeam) {
        d.innings.push({
            "id": d.innings.length,
            "battingTeam": battingTeam
        });

        return true;
    }

    function pushOver(bowlerId) {
        d.overs.push({
            "inningId": d.innings.length - 1,
            "id": d.overs.length,
            "bowlerId": bowlerId
        });

        return true;
    }

    function pushBall(batsmanId, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, batPen, bwlPen, dateTime) {
        // Duck Typing.
        runs = testInt(runs);
        wagonX = testInt(wagonX);
        wagonY = testInt(wagonY);
        pitchX = testInt(pitchX);
        pitchY = testInt(pitchY);
        batPen = testInt(batPen);
        bwlPen = testInt(bwlPen);

        wicket = testBool(wicket);
        wideBall = testBool(wideBall);
        noBall = testBool(noBall);
        byes = testBool(byes);
        legByes = testBool(legByes);

        dateTime = testDate(dateTime);

        // If no batsman id has been provided, use the last one if it is still the same over.
        batsmanId = batsmanId || (d.overs[d.overs.length - 1].id === d.balls[d.balls.length - 1].overId ? d.balls[d.balls.length - 1].batsmanId : null);

        // Create a new ball.
        d.balls.push({
            "overId": d.overs.length - 1,
            "id": d.balls.length,
            "batsmanId": batsmanId,
            "runs": runs,
            "wideBall": wideBall,
            "noBall": noBall,
            "byes": byes,
            "legByes": legByes,
            "wicketId": wicket === true ? d.wickets.length - 1 : null,
            "wagonX": wagonX,
            "wagonY": wagonY,
            "pitchX": pitchX,
            "pitchY": pitchY,
            "batPen": batPen,
            "bwlPen": bwlPen,
            "dateTime": dateTime
        });

        return true;
    }

    function pushWicket(batsmanId, howOut, fielderId) {
        // Ten ways to get out http://news.bbc.co.uk/sport1/hi/cricket/rules_and_equipment/4180344.stm
        // Duck check.
        var valid = ((d.wickets.length > 0) && (d.balls.length > 0) ? d.wickets[d.wickets.length - 1].ballId !== d.balls.length : true) === false ? false : (/^(bowled|lbw|handled the ball|hit wicket|hit the ball twice)$/).test(howOut) ? "bowler" : (/^(caught|stumped)$/).test(howOut) ? "both" : (/^(runout)$/).test(howOut) ? "fielder" : (/^(obstruction|timed out)$/).test(howOut) ? "none" : false,
            bowlerId = ((valid === "bowler") || (valid === "both")) ? (d.overs[d.overs.length - 1].bowlerId || null) : null;
            fielderId = ((valid === "fielder") || (valid === "both")) ? (fielderId || null) : null;

        // Create a new wicket if duck checks were successful.
        if (valid !== false) {
            d.wickets.push({
                "ballId": d.balls.length,
                "id": d.wickets.length,
                "batsmanId": batsmanId,
                "bowlerId": bowlerId,
                "fielderId": fielderId,
                "howOut": howOut
            });
        }

        // Return true if a new wicket was added.
        return valid !== false;
    }

    // Pops/Undoes the last event.
    function pop() {
        // Determine which list should be popped.
        var list = d.innings.length !== (d.overs[d.overs.length - 1].inningId + 1) ? d.innings : d.overs.length !== d.balls[d.balls.length - 1].overId + 1 ? d.overs : d.balls[d.balls.length - 1].wicketId === null ? d.balls : d.wickets;

        // Remove the wicket id from the ball because the wicket will no longer exist.
        if (list === d.wickets) {
            d.balls[d.balls.length - 1].wicketId = null;
        }

        // Pop an item off the selected list and return true to show that the undo was successful.
        list.pop();
        return true;
    }

    // Assists pull/get functions with object comparisons.
    function compareValues(thisObject, thatObject, objKeys) {
        var i,
            match = true,
            objKeys = objKeys || Object.keys(thatObject);

        // For each key in thatObject check if the associated value is the same in both thisObject and thatObject.
        for (i = 0; (i < objKeys.length) && (match === true); i += 1) {
            if (thisObject[objKeys[i]] !== thatObject[objKeys[i]]) {
                match = false;
            }
        }

        return match;
    }

    // Pull/Get functions.
    function pullInnings(inning) {
        var nInnings, i, objKeys,
            returnInnings = [];

        // If the inning id is known, return the only inning with that id.
        if (inning ? inning.id : false) {
            // If the inning has a batting team and the team is correct then return the inning.
            if (!inning.battingTeam || (inning.battingTeam === d.innings[inning.id].battingTeam)) {
                returnInnings.push(d.innings[inning.id]);
            }
        } else {
            nInnings = d.innings.length;
            objKeys = inning ? Object.keys(inning) : [];

            // Compare every inning with the given inning and return the inning if they match.
            for (i = 0; i < nInnings; i += 1) {
                if (compareValues(d.innings[i], inning, objKeys)) {
                    returnInnings.push(d.innings[i]);
                }
            }
        }

        return returnInnings;
    }

    function pullOvers(inning, over) {
        var nOvers, i, objKeys,
            returnOvers = [];

        // If the over id is known, return the only over with that id.
        if (over ? over.id : false) {
            // If the inning of the over matches that given, return the over.
            if (compareValues(d.innings[d.overs[over.id].inningId], inning, null)) {
                returnOvers.push(d.overs[over.id]);
            }
        } else {
            nOvers = d.overs.length;
            objKeys = over ? Object.keys(over) : [];

            // Compare every over with the given over and return the over if they match.
            for (i = 0; i < nOvers; i += 1) {
                if (compareValues(d.overs[i], over, objKeys)) {
                    returnOvers.push(d.overs[i]);
                }
            }
        }

        return returnOvers;
    }

    function pullBalls(inning, over, ball) {
        var nBalls, nOvers, objKeys, i, o,
            returnBalls = [],
            matchedOvers = pullOvers(inning, over);

        // If the ball id is known, return the only ball with that id.
        if (ball ? ball.id : false) {
            // If the over of the ball matches that given, return the ball.
            if (matchedOvers[0].id === d.balls[ball.id].overId) {
                returnBalls.push(d.balls[ball.id]);
            }
        } else {
            nBalls = d.balls.length;
            nOvers = matchedOvers.length;
            objKeys = ball ? Object.keys(ball) : [];

            // Compare every ball with the given ball and return the ball if they match.
            for (i = 0; i < nBalls; i += 1) {
                if (compareValues(d.balls[i], ball, objKeys)) {
                    // If the over id of the ball matches one of the ids of matches overs then return the ball.
                    for (o = 0; o < nOvers; o += 1) {
                        if (matchedOvers[o].id === d.balls[i].overId) {
                            returnBalls.push(d.balls[i]);
                            break;
                        }
                    }
                }
            }
        }

        return returnBalls;
    }

    function pullWickets(inning, over, ball, wicket) {
        var nWickets, nBalls, objKeys, i, o,
            returnWickets = [],
            matchedBalls = pullBalls(inning, over, ball);

        // If the wicket id is known, return the only wicket with that id.
        if (wicket ? wicket.id : false) {
            // If the ball of the wicket matches that given, return the wicket.
            if (matchedBalls[0].id === d.wickets[wicket.id].ballId) {
                returnWickets.push(d.wickets[wicket.id]);
            }
        } else {
            nWickets = d.wickets.length;
            nBalls = matchedBalls.length;
            objKeys = wicket ? Object.keys(wicket) : [];

            // Compare every wicket with the given wicket and return the wicket if they match.
            for (i = 0; i < nWickets; i += 1) {
                if (compareValues(d.wickets[i], wicket, objKeys)) {
                    // If the ball id of the wicket matches one of the ids of matches balls then return the wicket.
                    for (o = 0; o < nBalls; o += 1) {
                        if (matchedBalls[o].id === d.wickets[i].ballId) {
                            returnWickets.push(d.wickets[i]);
                            break;
                        }
                    }
                }
            }
        }

        return returnWickets;
    }

    // Public functions and variables (scorebook interface).
    return {
        "addInnings": pushInning,
        "addOver": pushOver,
        "addBall": pushBall,
        "addWicket": pushWicket,
        "undo": pop,
        "getInnings": pullInnings,
        "getOvers": pullOvers,
        "getBalls": pullBalls,
        "getWickets": pullWickets,
        "data": d
    };
};