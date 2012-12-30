function pushTests(book) {
  doTest(book.addInnings(1), true, "Push Inning error #1");
  doTest(book.addOver(1), true, "Push Over error #1");
  doTest(book.addBall(12, 1, false, false, false, false, false, 10, 11, 5, 4, 0, 0, null), true, "Push ball error #1");
  doTest(book.addWicket(12, "caught", 2), true, "Push Wicket error #2");
  doTest(book.addWicket(12, "caught", 2), false, "Push Wicket error #1");
  doTest(book.addBall(14, 0, false, false, false, false, true, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #2");
  doTest(book.addBall(14, 0, true, false, false, false, false, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #3");
  doTest(book.addBall(14, 0, false, true, false, false, false, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #4");
  doTest(book.addBall(14, 0, false, false, true, false, false, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #5");
  doTest(book.addBall(14, 0, false, false, false, true, false, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #6");
  doTest(book.addBall(14, 4, false, false, false, false, false, 0, 0, 0, 0, 0, 0, null), true, "Push ball error #7");
  doTest(book.undo(), true, "Undo error #1");
  doTest(book.data.innings.length, 1, "Push Inning error #2");
  doTest(book.data.overs.length, 1, "Push Over error #2");
  doTest(book.data.balls.length, 6, "Push Ball error #8");
  doTest(book.data.wickets.length, 1, "Push Wicket error #3");
  return book.data;
}

function pullTests(book) {
  // Get Innings.
  doTest(book.getInnings()[0].id, 0, "pullInnings error #1");
  doTest(book.getInnings({"id" : 0})[0].id, 0, "pullInnings error #2");
  doTest(book.getInnings({"battingTeam" : 1})[0].id, 0, "pullInnings error #3");

  // Get Overs.
  doTest(book.getOvers()[0].id, 0, "pullOvers error #1");
  doTest(book.getOvers({"id" : 0})[0].id, 0, "pullOvers error #2");
  doTest(book.getOvers({"battingTeam" : 1})[0].id, 0, "pullOvers error #3");
  doTest(book.getOvers(null, {"id" : 0})[0].id, 0, "pullOvers error #4");
  doTest(book.getOvers({}, {"id" : 0})[0].id, 0, "pullOvers error #5");
  doTest(book.getOvers({"id" : 0}, {"bowlerId": 1})[0].id, 0, "pullOvers error #6");

  // Get Balls.
  doTest(book.getBalls()[0].id, 0, "pullBalls error #1");

  // Get Wickets.
  doTest(book.getWickets()[0].id, 0, "pullWickets error #1");
}

function doTest(actualOutput, expectedOutput, message) {
  tests += 1;
  if (actualOutput !== expectedOutput) {
    errors += 1;
    console.log(message);
    return false;
  }
  return true;
}

console.log("Starting tests.");
tests = 0;
errors = 0;
book = new scorebook();
pushTests(book);
pullTests(book);
console.log("Completed " + tests + " tests with " + errors + " errors.");