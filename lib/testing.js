function pushTests(book) {
  book.addInnings(1);
  book.addOver(1);
  book.addBall(12, 1, false, false, false, false, false, 10, 11, 5, 4, 0, 0, null);
  book.addWicket(12, "caught", 2);
  book.addBall(14, 0, false, false, false, false, true, 0, 0, 0, 0, 0, 0, null);
  book.addBall(14, 0, true, false, false, false, false, 0, 0, 0, 0, 0, 0, null);
  book.addBall(14, 0, false, true, false, false, false, 0, 0, 0, 0, 0, 0, null);
  book.addBall(14, 0, false, false, true, false, false, 0, 0, 0, 0, 0, 0, null);
  book.addBall(14, 0, false, false, false, true, false, 0, 0, 0, 0, 0, 0, null);
  book.addBall(14, 4, false, false, false, false, false, 0, 0, 0, 0, 0, 0, null);
  book.undo();
  console.log("# Push Test (Output 1): " + book.data.innings);
  console.log("# Push Test (Output 2): " + book.data.overs);
  console.log("# Push Test (Output 3): " + book.data.balls);
  console.log("# Push Test (Output 4): " + book.data.wickets);
  return book.data;
}

function pullTests(book) {
  // Get Innings.
  console.log("# Pull Innings Test (Output 1): " + book.getInnings()[0].id);
  console.log("# Pull Innings Test (Output 2): " + book.getInnings({"id" : 0})[0].id);
  console.log("# Pull Innings Test (Output 3): " + book.getInnings({"battingTeam" : 1})[0].id);

  // Get Overs.
  console.log("# Pull Overs Test (Output 1): " + book.getOvers()[0].id);
  console.log("# Pull Overs Test (Output 2): " + book.getOvers({"id" : 0})[0].id);
  console.log("# Pull Overs Test (Output 3): " + book.getOvers({"battingTeam" : 1})[0].id);
  console.log("# Pull Overs Test (Output 4): " + book.getOvers(null, {"id" : 0})[0].id);
  console.log("# Pull Overs Test (Output 5): " + book.getOvers({}, {"id" : 0})[0].id);
  console.log("# Pull Overs Test (Output 6): " + book.getOvers({"id" : 0}, {"bowlerId": 1})[0].id);

  // Get Balls.
  console.log("# Pull Balls Test (Output 1): " + book.getBalls()[0].id);

  // Get Wickets.
  console.log("# Pull Wickets Test (Output 1): " + book.getWickets()[0].id);
}

book = new scorebook();
pushTests(book);
pullTests(book);