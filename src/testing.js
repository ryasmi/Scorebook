function pushTests(book) {
  doTest(book.addInnings(1), true, "Push Inning error #a1");
  doTest(book.addOver(1), true, "Push Over error #a1");
  doTest(book.addBall(12, 1, false, false, false, false, false, 10, 11, 5, 4, 0, 0, null), true, "Push ball error #a1");
  doTest(book.addWicket(12, "caught", 2), true, "Push Wicket error #a1");
  doTest(book.addWicket(12, "caught", 2), false, "Push Wicket error #a2");
  pushBall(book);
  doTest(book.undo(), true, "Undo error #a1");
  return book.data;
}

function pushBall(book) {
  var args = [
    [12, 14, "str", null, []],
    [null, {}, "0", 0],
    [null, true, false, 0, "doig"],
    [null, true, false, 0, "doig"],
    [null, true, false, 0, "doig"],
    [null, true, false, 0, "doig"],
    [null, true, false, 0, "doig"],
    [0, null],
    [0, null],
    [0, null],
    [0, null],
    [0, null],
    [0, null],
    [null, new Date()]
  ];

  repeatTest("pushBall", book.addBall, args, true);
}

function pullTests(book) {
  pullInninngs(book);
  pullOvers(book);
  pullBalls(book);
  pullWickets(book);
}

function pullInninngs(book) {
  var args = [
      [null, {}, {"id" : 0}, {"battingTeam" : 1}]
    ];

  repeatTest("pullInninngs", book.getOvers, args, null);
}

function pullOvers(book) {
  var args = [
      [null, {}, {"id" : 0}, {"battingTeam" : 1}],
      [null, {}, {"id" : 0}, {"bowlerId" : 0}]
    ];

  repeatTest("pullOvers", book.getOvers, args, null);
}

function pullBalls(book) {
  var args = [
      [null, {}, {"id" : 0}, {"battingTeam" : 1}],
      [null, {}, {"id" : 0}, {"bowlerId" : 0}],
      [null, {}, {"overId" : 0, "id" : 0, "batsmanId" : 12}]
    ];

  repeatTest("pullBalls", book.getBalls, args, null);
}

function pullWickets(book) {
  var args = [
      [null, {}, {"id" : 0}, {"battingTeam" : 1}],
      [null, {}, {"id" : 0}, {"bowlerId" : 0}],
      [null, {}, {"overId" : 0, "id" : 0, "batsmanId" : 12}],
      [null, {}, {"fielderId" : 2, "howout" : "caught"}]
    ];

  repeatTest("pullWickets", book.getWickets, args, null);
}


function repeatTest(testName, fn, argValues, expectedOutput) {
  var i, result, arg,
    repeats = 0,
    args = [],
    argId = [];

  // Get the number of required tests.
  for (i = 0; i < argValues.length; i += 1) {
    repeats += argValues[i].length;
    argId.push(0);
  }

  // Repeat tests.
  for (i = 0; i < repeats; i += 1) {
    for (arg = 0; arg < argValues.length; arg += 1) {
      // If the argument id is too high reset it to zero and increment the next argument's id.
      if (argId[arg] >= arg.length - 1) {
        argId[arg] = 0;
        argId[arg + 1] += 1;
      }

      // Assign the argument value.
      args[arg] = argValues[arg][argId[arg]];
    }

    // Do the test.
    doTest(fn.apply(console, Array.prototype.slice.call(args)), expectedOutput, testName + " error #" + i);
  }
}

function doTest(actualOutput, expectedOutput, message) {
  tests.total += 1;
  try {
    if ((actualOutput !== expectedOutput) && (expectedOutput !== null)) {
      console.log("Test #" + tests.total + " failed: " + message);
      tests.errors += 1;
    }
  }
  catch (ex) {
    tests.errors += 1;
    console.log("Test #" + tests.total + " failed: " + message);
    console.log("(" + ex + "}");
  }
  return tests;
}

function dataOutput(book) {
  var i,
    attr = ["innings", "overs", "balls", "wickets"];

  for (i = 0; i < attr.length; i += 1) {
    console.log(attr[i] + ": " + book.data[attr[i]].length);
  }
}

console.log("Starting tests.");
tests = {"total" : 0, "errors" : 0};
book = Object.create(Scorebook());
pushTests(book);
pullTests(book);
dataOutput(book);
console.log("Completed " + tests.total + " tests with " + tests.errors + " errors.");