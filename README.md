# [Scorebook](https://www.github.com/ryansmith94/Scorebook)
A JavaScript library for cricket scoring created for use in cricket scoring applications and cricket games that require scoring. The library is incredibly flexible allowing for different rules sets, match lengths and includes options for recording the pitch of the ball while bowling and where the ball goes whilst batting. This can provide useful statistics and allow the creation of wagon wheels and the like.

## Contributing
1. Go the [issues](https://github.com/ryansmith94/Scorebook/issues?state=open "scorebook/issues") and see if there is anything that needs doing.
2. Read the [code styling guidlines](https://github.com/ryansmith94/Scorebook/blob/master/STYLE.md "STYLE.md").
3. [Fork](https://github.com/ryansmith94/Scorebook/fork "scorebook/fork") the project so that you have your own copy of the repository.
4. Make the updates you'd like to make on your copy of the repository.
5. Make a [pull request](https://github.com/ryansmith94/Scorebook/pull/new/master "scorebook/pull-request").


## Library
### How To Use It (Temporary Solution)
1. Download:
 * Library/intro.js
 * Library/core.js
2. Create a new JavaScript file (i.e. scorebook.js)
3. Put the code from the 3 downloaded files in this order:
 * intro.js
 * core.js
4. Use your new JavaScript file in your project.
5. To create a new match use `foobar = new Scorebook()`


### Public Functions
* addInnings
  * Arguments: battingTeam
  * Returns: true
* addOver
  * Arguments: bowlerId
  * Returns: true
* addBall
  * Arguments: batsmanId, [runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, batPen, bwlPen, dateTime]
  * Returns: true
  * Note: If a wicket was taken, always add a wicket before adding the ball that was bowled prior to taking the wicket.
* addWicket
  * Arguments: batsmanId, howOut, [fielderId]
  * Returns: true
  * Note: Always add a wicket before adding the ball that was bowled prior to taking the wicket.
* undo
  * Arguments: 
  * Returns: true
* getInnings
  * Arguments: [inning *(of type Inning)*]
  * Returns: Array *(of type Inning)*
* getOvers
  * Arguments: [inning *(of type Inning)*, over *(of type Over)*]
  * Returns: Array *(of type Over)*
* getBalls 
  * Arguments: [inning *(of type Inning)*, over *(of type Over)*, ball *(of type Ball)*]
  * Returns: Array *(of type Ball)*
* getWickets 
  * Arguments: [inning *(of type Inning)*, over *(of type Over)*, ball *(of type Ball)*, wicket *(of type Wicket)*]
  * Returns: *Array (of type Wicket)*


### Public Variables
* data *(Object)*
  * innings *(Array of type Inning)*
  * overs *(Array of type Over)*
  * balls *(Array of type Ball)*
  * wickets *(Array of type Wicket)*

### Classes
* Inning
  * id *(Integer)*
  * battingTeam *(Expecting Integer)*
* Over
  * id *(Integer)*
  * inningsId *(Integer)*
  * bowlerId *(Expecting Integer)*
* Ball
  * id *(Integer)*
  * overId *(Integer)*
  * batsmanId *(Expecting Integer)*
  * runs *(Expecting Integer)*
  * wideBall *(Expecting Boolean)*
  * noBall *(Expecting Boolean)*
  * byes *(Expecting Boolean)*
  * legByes *(Expecting Boolean)*
  * wicketId *(Integer)*
  * wagonX *(Expecting Integer)*
  * wagonY *(Expecting Integer)*
  * pitchX *(Expecting Integer)*
  * pitchY *(Expecting Integer)*
  * batPen *(Expecting Integer)*
  * bwlPen *(Expecting Integer)*
  * dateTime *(Expecting Date/Time)*
* Wicket
  * id *(Integer)*
  * ballId *(Integer)*
  * batsmanId *(Expecting Integer)*
  * bowlerId *(Expect Integer)*
  * fielderId *(Expecting Integer)*
  * howOut *(Expecting "bowled", "lbw", "handled the ball", "hit wicket", "hit the ball twice", "caught", "stumped", "runout", "obstruction", "timed out")*
