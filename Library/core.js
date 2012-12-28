var scorebook = function (data, undefined) {
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
    return ((typeof value === "number") && (Math.floor(value) === value)) ? value || 0 : 0;
  }

  function testBool(value) {
    return ((value === true) || (value === false)) ? value || false : false;
  }

  function testDate(value) {
    // src: stackoverflow/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript @Borgar.
    return (Object.prototype.toString.call(d) === "[object Date]") ? (isNaN(d.getTime()) ? null : value) : null;
  }

  // Data manipulation.
  function pushInning(battingTeam) {
    d.innings.push({
      "id" : d.innings.length,
      "battingTeam" : battingTeam
    });

    return true;
  }

  function pushOver(bowlerId) {
    d.overs.push({
      "inningId" : d.innings.length - 1,
      "id" : d.overs.length,
      "bowlerId" : bowlerId
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
    batsmanId = batsmanId || (d.overs[d.overs.length - 1] = d.balls[d.balls.length - 1].overId ? d.balls[d.balls.length - 1].batsmanId : null);

    // Create a new ball.
    d.balls.push({
      "overId" : d.overs.length - 1,
      "id" : d.balls.length,
      "batsmanId" : batsmanId,
      "runs" : runs,
      "wideBall" : wideBall,
      "noBall" : noBall,
      "byes" : byes,
      "legByes" : legByes,
      "wicketId" : wicket === true ? d.wickets.length - 1 : null,
      "wagonX" : wagonX,
      "wagonY" : wagonY,
      "pitchX" : pitchX,
      "pitchY" : pitchY,
      "batPen" : batPen,
      "bwlPen" : bwlPen,
      "dateTime" : dateTime
    });

    return true;
  }

  function pushWicket(batsmanId, howOut, fielderId) {
    // Ten ways to get out http://news.bbc.co.uk/sport1/hi/cricket/rules_and_equipment/4180344.stm
    // Duck check.
    var valid = (/^(bowled|lbw|handled the ball|hit wicket|hit the ball twice)$/).test(howOut) ? "bowler" :
          (/^(caught|stumped)$/).test(howOut) ? "both" :
          (/^(runout)$/).test(howOut) ? "fielder" :
          (/^(obstruction|timed out)$/).test(howOut) ? "none" : false,
      bowlerId = ((valid === "bowler") || (valid === "both")) ? d.overs[d.overs.length - 1].bowlerId || null : null;
      fielderId = ((valid === "fielder") || (valid === "both")) ? fielderId || null : null;

    // Create a new wicket if duck checks were successful.
    if (valid !== false) {
      d.wickets.push({
        "ballId" : d.balls.length,
        "id" : d.wickets.length,
        "batsmanId": batsmanId,
        "bowlerId": bowlerId,
        "fielderId": fielderId,
        "howOut": howOut
      });
    }

    // Return true if a new wicket was added.
    return valid !== false;
  }

  function pop() {
    // Determine which list should be popped.
    var list = d.innings.length !== (d.overs[d.overs.length - 1].inningId + 1) ? d.innings :
          d.overs.length !== d.balls[d.balls.length - 1].overId + 1 ? d.overs :
          d.balls[d.balls.length - 1].wicketId === null ? d.balls : d.wickets;

    // Remove the wicket id from the ball because the wicket will no longer exist.
    if (list === d.wickets) {
      d.balls[d.balls.length - 1].wicketId = null;
    }

    // Pop an item off the selected list and return true to show that the undo was successful.
    list.pop();
    return true;
  }

  function compareValues(thisObject, thatObject, objKeys) {
    var match = true,
      objKeys = objKeys || Object.keys(thatObject),
      i;

    for (i = 0; i < objKeys.length; i += 1) {
      if (thisObject[objKeys[i]] !== thatObject[objKeys[i]]) {
        match = false;
      }
    }

    return match;
  }

  function pullInnings(inning) {
    var returnInnings = [];

    if (inning ? inning.id : false) {
      returnInnings.push(d.innings[inning.id]);
    }
    else {
      var nInnings = d.innings.length,
        objKeys = inning ? Object.keys(inning) : [],
        i;

      for (i = 0; i < nInnings; i += 1) {
        if (compareValues(d.innings[i], inning, objKeys)) {
          returnInnings.push(d.innings[i]);
        }
      }
    }

    return returnInnings;
  }

  function pullOvers(inning, over) {
    var returnOvers = [];

    if (over ? over.id : false) {
      if (compareValues(d.innings[d.overs[over.id].inningId], inning, null)) {
        returnOvers.push(d.overs[over.id]);
      }
    }
    else {
      var nOvers = d.overs.length,
        objKeys = over ? Object.keys(over) : [],
        i;

      for (i = 0; i < nOvers; i += 1) {
        if (compareValues(d.overs[i], over, objKeys)) {
          returnOvers.push(d.overs[i]);
        }
      }
    }

    return returnOvers;
  }

  function pullBalls(inning, over, ball) {
    var returnBalls = [],
      matchedOvers = pullOvers(inning, over);

    if (ball ? ball.id : false) {
      if (matchedOvers[0].id === d.balls[ball.id].overId) {
        returnBalls.push(d.balls[ball.id]);
      }
    }
    else {
      var nBalls = d.balls.length,
        nOvers = matchedOvers.length,
        objKeys = ball ? Object.keys(ball) : [],
        i,
        o;

      for (i = 0; i < nBalls; i += 1) {
        if (compareValues(d.balls[i], ball, objKeys)) {
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
    var returnWickets = [],
      matchedBalls = pullBalls(inning, over, ball);

    if (wicket ? wicket.id : false) {
      if (matchedBalls[0].id === d.wickets[wicket.id].ballId) {
        returnWickets.push(d.wickets[wicket.id]);
      }
    }
    else {
      var nWickets = d.wickets.length,
        nBalls = matchedBalls.length,
        objKeys = wicket ? Object.keys(wicket) : [],
        i,
        o;

      for (i = 0; i < nWickets; i += 1) {
        if (compareValues(d.wickets[i], wicket, objKeys)) {
          for (o = 0; o < nBalls; o += 1) {
            if (matchedBalls[o].id === d.wickets[i].ballId){
              returnWickets.push(d.wickets[i]);
              break;
            }
          }
        }
      }
    }

    return returnWickets;
  }

  // Public functions and variables.
  return {
    "addInnings": pushInning,
    "addOver": pushOver,
    "addBall": pushBall,
    "addWicket": pushWicket,
    "undo": pop,
    "getInnings" : pullInnings,
    "getOvers" : pullOvers,
    "getBalls" : pullBalls,
    "getWickets" : pullWickets,
    "data": d
  };
}