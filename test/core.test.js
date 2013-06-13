/* jshint maxstatements: false, node: true */
(function () {
    "use strict";

    // Setup.
    var test = require("micro-assert").assert();
    var sb = require("./release.min.js").scorebook();
    var d = sb.data;
    var team1 = {"name": "Team 1"};
    var team2 = {"name": "Team 2"};
    var player1 = {"name": "Player 1", "team": team1};
    var player2 = {"name": "Player 2", "team": team1};
    var player3 = {"name": "Player 3", "team": team2};
    var player4 = {"name": "Player 4", "team": team2};

    // Test method availability.
    test.equal(!!sb.addInnings, true, "Find addInnings function");
    test.equal(!!sb.addOver, true, "Find addOver function");
    test.equal(!!sb.addBall, true, "Find addBall function");
    test.equal(!!sb.addWicket, true, "Find addWicket function");
    test.equal(!!sb.getInnings, true, "Find getInnings function");
    test.equal(!!sb.getOvers, true, "Find getOvers function");
    test.equal(!!sb.getBalls, true, "Find getBalls function");
    test.equal(!!sb.getWickets, true, "Find getWickets function");
    test.equal(!!sb.undo, true, "Find undo function");

    // Test property availability.
    test.equal(!!d, true, "Find data property");
    test.equal(!!d.innings, true, "Find data.innings property");
    test.equal(!!d.overs, true, "Find data.overs property");
    test.equal(!!d.balls, true, "Find data.balls property");
    test.equal(!!d.wickets, true, "Find data.wickets property");

    // Test addInnings.
    sb.addInnings(team1);
    test.equal(!!d.innings[0].children, true, "Correct children with addInnings");
    test.equal(!!d.innings[0].parent, true, "Correct parent with addInnings");
    test.equal(d.innings[0].id, 0, "Correct id with addInnings");
    test.equal(d.innings[0].battingTeam, team1, "Correct battingTeam with addInnings");

    // Test addOver.
    sb.addOver(player4);
    test.equal(!!d.overs[0].children, true, "Correct children with addOver");
    test.equal(d.overs[0].parent, d.innings[0], "Correct parent with addOver");
    test.equal(d.overs[0].id, 0, "Correct id with addOver");
    test.equal(d.overs[0].bowler, player4, "Correct bowler with addOver");
    test.equal(d.innings[0].children[0], d.overs[0], "Correct children on parent with addOver");

    // Test addBall.
    sb.addBall(player1);
    test.equal(!!d.balls[0].children, true, "Correct children with addBall");
    test.equal(d.balls[0].parent, d.overs[0], "Correct parent with addBall");
    test.equal(d.balls[0].id, 0, "Correct id with addBall");
    test.equal(d.balls[0].batsman, player1, "Correct batsman with addBall");
    test.equal(d.balls[0].runs, 0, "Correct runs with addBall");
    test.equal(d.balls[0].wideBall, false, "Correct wideBall with addBall");
    test.equal(d.balls[0].noBall, false, "Correct noBall with addBall");
    test.equal(d.balls[0].byes, false, "Correct byes with addBall");
    test.equal(d.balls[0].legByes, false, "Correct legByes with addBall");
    test.equal(isNaN(d.balls[0].wagonX), true, "Correct wagonX with addBall");
    test.equal(isNaN(d.balls[0].wagonY), true, "Correct wagonY with addBall");
    test.equal(isNaN(d.balls[0].pitchX), true, "Correct pitchX with addBall");
    test.equal(isNaN(d.balls[0].pitchY), true, "Correct pitchY with addBall");
    test.equal(d.balls[0].batPen, 0, "Correct batPen with addBall");
    test.equal(d.balls[0].bwlPen, 0, "Correct bwlPen with addBall");
    test.equal(d.balls[0].dateTime.getTime(), new Date(d.balls[0].dateTime).getTime(), "Correct date with addBall");
    test.equal(d.overs[0].children[0], d.balls[0], "Correct children on parent with addBall");

    sb.addBall(player1, 1, true, false, false, false, 2, 3, 4, 5, 6, 7);
    test.equal(!!d.balls[1].children, true, "Correct children with addBall");
    test.equal(d.balls[1].parent, d.overs[0], "Correct parent with addBall");
    test.equal(d.balls[1].id, 1, "Correct id with addBall");
    test.equal(d.balls[1].batsman, player1, "Correct batsman with addBall");
    test.equal(d.balls[1].runs, 1, "Correct runs with addBall");
    test.equal(d.balls[1].wideBall, true, "Correct wideBall with addBall");
    test.equal(d.balls[1].noBall, false, "Correct noBall with addBall");
    test.equal(d.balls[1].byes, false, "Correct byes with addBall");
    test.equal(d.balls[1].legByes, false, "Correct legByes with addBall");
    test.equal(d.balls[1].wagonX, 2, "Correct wagonX with addBall");
    test.equal(d.balls[1].wagonY, 3, "Correct wagonY with addBall");
    test.equal(d.balls[1].pitchX, 4, "Correct pitchX with addBall");
    test.equal(d.balls[1].pitchY, 5, "Correct pitchY with addBall");
    test.equal(d.balls[1].batPen, 6, "Correct batPen with addBall");
    test.equal(d.balls[1].bwlPen, 7, "Correct bwlPen with addBall");

    sb.addBall(player1, 0, false, true, false, false);
    test.equal(d.balls[2].id, 2, "Correct id with addBall");
    test.equal(d.balls[2].wideBall, false, "Correct wideBall with addBall");
    test.equal(d.balls[2].noBall, true, "Correct noBall with addBall");
    test.equal(d.balls[2].byes, false, "Correct byes with addBall");
    test.equal(d.balls[2].legByes, false, "Correct legByes with addBall");

    sb.addBall(player1, 0, false, false, true, false);
    test.equal(d.balls[3].id, 3, "Correct id with addBall");
    test.equal(d.balls[3].wideBall, false, "Correct wideBall with addBall");
    test.equal(d.balls[3].noBall, false, "Correct noBall with addBall");
    test.equal(d.balls[3].byes, true, "Correct byes with addBall");
    test.equal(d.balls[3].legByes, false, "Correct legByes with addBall");

    sb.addBall(player1, 0, false, false, false, true);
    test.equal(d.balls[4].id, 4, "Correct id with addBall");
    test.equal(d.balls[4].wideBall, false, "Correct wideBall with addBall");
    test.equal(d.balls[4].noBall, false, "Correct noBall with addBall");
    test.equal(d.balls[4].byes, false, "Correct byes with addBall");
    test.equal(d.balls[4].legByes, true, "Correct legByes with addBall");

    // Test addWicket.
    sb.addWicket(player1, "Run Out", player3);
    test.equal(!!d.wickets[0].children, true, "Correct children with addWicket");
    test.equal(d.wickets[0].parent, d.balls[4], "Correct parent with addWicket");
    test.equal(d.wickets[0].id, 0, "Correct id with addWicket");
    test.equal(d.wickets[0].batsman, player1, "Correct batsman with addWicket");
    test.equal(d.wickets[0].howOut, "Run Out", "Correct howOut with addWicket");
    test.equal(d.wickets[0].fielder, player3, "Correct fielder with addWicket");
    test.equal(d.balls[4].children[0], d.wickets[0], "Correct children on parent with addWicket");

    // Test getInnings.
    test.equal(sb.getInnings({})[0], d.innings[0], "Get innings with no filter with getInnings");
    test.equal(sb.getInnings({"battingTeam": team1})[0], d.innings[0], "Get existing innings with getInnings");
    test.equal(sb.getInnings({"battingTeam": team2}).length, 0, "Get non-existing innings with getInnings");

    // Test getOvers.
    test.equal(sb.getOvers({})[0], d.overs[0], "Get overs with no filter with getOvers");
    test.equal(sb.getOvers({"bowler": player4})[0], d.overs[0], "Get existing overs with getOvers");
    test.equal(sb.getOvers({"bowler": player3}).length, 0, "Get non-existing overs with getOvers");

    // Test getBalls.
    test.equal(sb.getBalls({})[0], d.balls[0], "Get balls with no filter with getBalls");
    test.equal(sb.getBalls({}).length, 5, "Get balls with no filter with getBalls");
    test.equal(sb.getBalls({"batsman": player1})[0], d.balls[0], "Get existing balls with getBalls");
    test.equal(sb.getBalls({"batsman": player1}).length, 5, "Get existing balls with getBalls");
    test.equal(sb.getBalls({"batsman": player2}).length, 0, "Get non-existing balls with getBalls");

    // Test getWickets.
    test.equal(sb.getWickets({})[0], d.wickets[0], "Get wickets with no filter with getWickets");
    test.equal(sb.getWickets({"batsman": player1})[0], d.wickets[0], "Get existing wickets with getWickets");
    test.equal(sb.getWickets({"batsman": player2}).length, 0, "Get non-existing wickets with getWickets");

    // Test undo.
    sb.undo();
    test.equal(d.wickets.length, 0, "Undo wicket");
    test.equal(d.balls[4].children.length, 0, "Undo wicket");
    sb.undo();
    test.equal(d.balls.length, 4, "Undo ball");
    test.equal(d.overs[0].children.length, 4, "Undo ball");
    sb.undo();
    test.equal(d.balls.length, 3, "Undo ball");
    test.equal(d.overs[0].children.length, 3, "Undo ball");
    sb.undo();
    test.equal(d.balls.length, 2, "Undo ball");
    test.equal(d.overs[0].children.length, 2, "Undo ball");
    sb.undo();
    test.equal(d.balls.length, 1, "Undo ball");
    test.equal(d.overs[0].children.length, 1, "Undo ball");
    sb.undo();
    test.equal(d.balls.length, 0, "Undo ball");
    test.equal(d.overs[0].children.length, 0, "Undo ball");
    sb.undo();
    test.equal(d.overs.length, 0, "Undo over");
    test.equal(d.innings[0].children.length, 0, "Undo over");
    sb.undo();
    test.equal(d.innings.length, 0, "Undo innings");

    // Output test results.
    return test.result();
}());