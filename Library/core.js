  var d = data;
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
      "battingTeam" : battingTeam
    });
    return true;
  }

  function pushOver(bowlerId) {
    d.overs.push({
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

    // Functionality.
    d.balls.push({
      "inningId" : d.innings.length - 1,
      "overId" : d.overs.length - 1,
      "batsmanId" : batsmanId,
      "runs" : runs,
      "wideBall" : wideBall,
      "noBall" : noBall,
      "byes" : byes,
      "legByes" : legByes,
      "wicketId" : wicket === true ? d.wickets.length - 1 : -1,
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
      bowlerId = valid === "bowler" || valid === "both" ? d.overs[d.overs.length - 1].bowlerId : -1;
    if (valid !== "fielder" && valid !== "both") {fielderId = -1;}

    // Functionality.
    if (valid !== false) {
      d.wickets.push({
        "batsmanId": batsmanId,
        "bowlerId": bowlerId,
        "fielderId": fielderId,
        "howOut": howOut
      });
    }

    return valid !== false;
  }

  function pop() {
    var list = d.innings.length !== (d.overs[d.overs.length - 1].inningId + 1) ? d.innings :
          d.overs.length !== d.balls[d.balls.length - 1].overId + 1 ? d.overs :
          d.balls[d.balls.length - 1].wicketId === -1 ? d.balls : d.wickets;

    list.pop();
    return true;
  }

  function pullInning(inningId, battingTeam) {
    var returnInnings = [],
      isInning = inningId ? function () {return i === inningId;} : true,
      isBattingTeam = battingTeam ? function () {return innings[i].battingTeam === battingTeam;} : true;

    for (i = 0; i < innings.length; i += 1) {
      if (isBattingTeam() && isInning()) {
        returnInnings.push(innings[i]);
      }
    }

    return returnInnings;
  }

  // Public functions and variables.
  return {
    "addInnings": pushInning,
    "addOver": pushOver,
    "addBall": pushBall,
    "addWicket": pushWicket,
    "undo": pop,
    "data": d
  };

  // TODO: Better comments.
  // TODO: Add pull functions.
  // Commit test.