# [Scorebook](https://www.github.com/ryansmith94/Scorebook)
A JavaScript library for cricket scoring created for use in cricket scoring applications and cricket games that require scoring. The library is incredibly flexible allowing for different rules sets, match lengths and includes options for recording the pitch of the ball while bowling and where the ball goes whilst batting. This can provide useful statistics and allow the creation of wagon wheels and the like.

![Travis-CI](https://api.travis-ci.org/ryansmith94/Scorebook.png?branch=master)     

**License**   
[This work is licensed under a CC BY-NC-SA 3.0 License.](http://creativecommons.org/licenses/by-nc-sa/3.0/)

**Contributing**   
Please make contributions by [forking](https://github.com/ryansmith94/Scorebook/fork "/fork") the project and creating a [pull-request](https://github.com/ryansmith94/Scorebook/pull/new/master "/pull-request"). Other contributions include maintaining the [Wiki](https://github.com/ryansmith94/Scorebook/wiki "/wiki") and [issues](https://github.com/ryansmith94/Scorebook/issues?state=open "/issues").

# Documentation
## 1 Installation
Reference the [raw Github version](https://raw.github.com/ryansmith94/Scorebook/master/build/release.min.js) of [release.min.js](https://www.github.com/ryansmith94/Scorebook/blob/master/build/release.min.js) in your code.

## 2 Getting Started
To create a new scorebook, use the global "scorebook" function.
```JavaScript
scorebook();
```

**Arguments**   
None.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

## 3 Methods
### 3.1 addInnings
Creates a new innings in the scorebook.
```JavaScript
scorebook().addInnings(battingTeam);
```

**Arguments**
* {Object} battingTeam: The team batting the innings.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

### 3.2 addOver
Creates a new over in the scorebook for the current innings.
```JavaScript
scorebook().addOver(bowler);
```

**Arguments**
* {Object} bowler: The player bowling the over.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

### 3.3 addBall
Creates a new ball in the scorebook for the current over.
```JavaScript
scorebook().addBall(batsman[, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, batPen, bwlPen]);
```

**Arguments**
* {Object} batsman: The player that faced the ball.
* {Number} runs: The number of runs.
* {Boolean} wideBall: Determines if a wide was bowled.
* {Boolean} noBall: Determines if a no ball was bowled.
* {Boolean} byes: Determines if the ball did not hit the bat/leg and scored runs.
* {Boolean} legByes: Determines if the ball hit the leg and scored runs.
* {Number} wagonX: A number that locates where the ball was hit to on the x-axis.
* {Number} wagonY: A number that locates where the ball was hit to on the y-axis.
* {Number} pitchX: A number that locates where the ball landed on the x-axis.
* {Number} pitchY: A number that locates where the ball landed on the y-axis.
* {Number} batPen: The number of penalty runs incurred by the batting team.
* {Number} bwlPen: The number of penalty runs incurred by the bowling team.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

### 3.4 addWicket
Creates a new wicket in the scorebook for the current ball.
```JavaScript
scorebook().addWicket(batsman, howOut[, fielder]);
```

**Arguments**
* {Object} batsman: The player that was given out.
* {String} howOut: How the batsman got out.
* {Object} fielder: The player that assisted/took the wicket in the field.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

### 3.5 getInnings
Gets innings from the scorebook.
```JavaScript
scorebook().getInnings(inning);
```

**Arguments**
* {Object} inning: An object that resembles (shares properties with) wanted innings.

**Returns**   
{Array} innings: An array of innings that resemble the given object (inning).

### 3.6 getOvers
Gets overs from the scorebook.
```JavaScript
scorebook().getOvers(over);
```

**Arguments**
* {Object} over: An object that resembles (shares properties with) wanted overs.

**Returns**   
{Array} overs: An array of overs that resemble the given object (over).

### 3.7 getBalls
Gets balls from the scorebook.
```JavaScript
scorebook().getBalls(ball);
```

**Arguments**
* {Object} ball: An object that resembles (shares properties with) wanted balls.

**Returns**   
{Array} balls: An array of balls that resemble the given object (ball).

### 3.8 getWickets
Gets wickets from the scorebook.
```JavaScript
scorebook().getWickets(wicket);
```

**Arguments**
* {Object} wicket: An object that resembles (shares properties with) wanted wickets.

**Returns**   
{Array} wickets: An array of wickets that resemble the given object (wicket).

### 3.9 undo
Undoes the last action.
```JavaScript
scorebook().undo();
```

**Arguments**   
None.

**Returns**   
{Object} scorebook: A structure that can be manipulated like a scorebook.

## 4 Properties
{Object} **data**: An object containing references to the raw data.
* {Array} innings: An array of innings contained in the scorebook.
* {Array} overs: An array of overs contained in the scorebook.
* {Array} balls: An array of balls contained in the scorebook.
* {Array} wickets: An array of wickets contained in the scorebook.