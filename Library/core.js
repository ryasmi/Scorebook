  var d = data;

  // Check if any data is not defined and define it as an empty list.
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
      "id" : d.overs.length,
      "inningId" : d.innings.length - 1,
      "bowlerId" : bowlerId
    });

    return true;
  }

  function pushBall(batsmanId, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, dateTime) {
    // Duck Typing.
    runs = testInt(runs);
    wagonX = testInt(wagonX);
    wagonY = testInt(wagonY);
    pitchX = testInt(pitchX);
    pitchY = testInt(pitchY);

    wicket = testBool(wicket);
    wideBall = testBool(wideBall);
    noBall = testBool(noBall);
    byes = testBool(byes);
    legByes = testBool(legByes);

    dateTime = testDate(dateTime);

    // Create a new ball.
    d.balls.push({
      "id" : d.balls.length,
      "overId" : d.overs.length - 1,
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
      "dateTime" : dateTime
    });

    return true;
  }

  function pushWicket(batsmanId, fielderId, howOut) {
    // Ten ways to get out http://news.bbc.co.uk/sport1/hi/cricket/rules_and_equipment/4180344.stm
    // Duck check.
    var valid = (new RegExp("^(bowled|lbw|handled the ball|hit wicket|hit the ball twice)$", "i")).test(howOut) ? "bowler" :
          (new RegExp("^(caught|stumped)$", "i")).test(howOut) ? "both" :
          (new RegExp("^(runout)$", "i")).test(howOut) ? "fielder" :
          (new RegExp("^(obstruction|timed out)$", "i")).test(howOut) ? "none" : false,
      bowlerId = ((valid === "bowler") || (valid === "both")) ? d.overs[d.overs.length - 1].bowlerId || null : null;
      fielderId = ((valid === "fielder") || (valid === "both")) ? fielderId || null : null;

    // Create a new wicket if duck checks were successful.
    if (valid !== false) {
      d.wickets.push({
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

  function pullInning(inningId, battingTeam) {
    // Create a return list and then two functions for instance comparison.
    var returnInnings = [],
      isBattingTeam = battingTeam ? function () {return innings[i].battingTeam === battingTeam;} : function () {return true;};

    if ((inningId !== null) && !battingTeam) {
      // Optimisation: Pushes the only innings that matches if battingTeam is undefined/null.
      returnInnings.push(innings[inningId]);
    } else if (!inningId) {
      // Attempt to match each inning with the input if inningId is undefined/null.
      for (i = 0; i < innings.length; i += 1) {
        if (isBattingTeam()) {
          returnInnings.push(innings[i]);
        }
      }
    }

    return returnInnings;
  }

  function pullOver(inningId, overId, bowlerId) {
    // Create a return list and then two functions for instance comparison.
    var returnOvers = [],
      isBowler = bowlerId ? function () {return overs[i].bowlerId === bowlerId;} : function () {return true;};
      isInning = inningId ? function () {return overs[i].inningId === inningId;} : function () {return true;};

    if ((overId !== null) && !bowlerId && !inningId) {
      // Optimisation: Pushes the only overs that matches if bowlerId and inningId is undefined/null.
      returnOvers.push(overs[overId]);
    } else if (!overId) {
      // Attempt to match each over with the input if overId is undefined/null.
      for (i = 0; i < overs.length; i += 1) {
        if (isBowler() && isInning()) {
          returnOvers.push(overs[i]);
        }
      }
    }

    return returnOvers;
  }

  function pullBall() {
    return true;
  }

  function pullWicket() {
    return true;
  }

  // Public functions and variables.
  return {
    "addInnings": pushInning,
    "addOver": pushOver,
    "addBall": pushBall,
    "addWicket": pushWicket,
    "undo": pop,
    "getInnings" : pullInning,
    //"getOvers" : pullOver,
    //"getBalls" : pullBall,
    //"getWickets" : pullWicket,
    "data": d
  };

  /* TODO
  * Complete pullBall and pullWicket using pullOver as a template.
  * TODO: Uncomment the remaining pull/get functions in the return statement.
  * TODO: Testing of all functions (Creating any issues found on GitHub or changing the code.
  */
  // Commit test 26.12.2012 19:25