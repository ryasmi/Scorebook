# [Scorebook](https://www.github.com/ryansmith94/Scorebook)
A cricket scoring library created for use in cricket scoring applications and cricket games that require scoring. The library is incredibly flexible allowing for different rules sets, match lengths and includes options for recording the pitch of the ball while bowling and where the ball goes whilst batting. This can provide useful statistics and allow the creation of wagon wheels and the like.


## Library
### How To Use It
1. Download:
 * Library/intro.js
 * Library/core.js
 * Library/outro.js
2. Create a new JavaScript file (i.e. scorebook.js)
3. Put the code from the 3 downloaded files in this order:
 * intro.js
 * core.js
 * outro.js
4. Use your new JavaScript file in your project.
5. To create a new match use foobar = new Scorebook()


### Public Functions
* addInnings
  * Arguments: battingTeam
  * Returns: true
* addOver
  * Arguments: bowlerId
  * Returns: true
* addBall
  * Arguments: batsmanId, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, dateTime
  * Returns: true
* addWicket
  * Arguments: batsmanId, fielderId, howOut
  * Returns: true
* undo
  * Arguments: 
  * Returns: true
* getInnings
  * Arguments: inningId, battingTeam
  * Returns: Array (of type Inning)
* getOvers
  * Arguments: inningId, overId, bowlerId
  * Returns: Array (of type Over)
* getBalls [COMING SOON]
  * Arguments: 
  * Returns: Array (of type Ball)
* getWickets [COMING SOON]
  * Arguments: 
  * Returns: Array (of type Wicket)


### Public Variables
* data (Object)
  * innings (Array of type Inning)
  * overs (Arrany of type Over)
  * balls (Arrany of type Ball)
  * wickets (Arrany of type Wicket)

### Classes
* Inning
  * id (Expecting Integer)
  * battingTeam (Expecting Integer)
* Over
  * id (Expecting Integer)
  * inningsId (Expecting Integer)
  * bowlerId (Expecting Integer)
* Ball
  * id (Expecting Integer)
  * overId (Expecting Integer)
  * batsmanId (Expecting Integer)
  * runs (Expecting Integer)
  * wideBall (Expecting Boolean)
  * noBall (Expecting Boolean)
  * byes (Expecting Boolean)
  * legByes (Expecting Boolean)
  * wicketId (Expecting Integer)
  * wagonX (Expecting Integer)
  * wagonY (Expecting Integer)
  * pitchX (Expecting Integer)
  * pitchY (Expecting Integer)
  * dateTime (Expecting Date/Time)
* Wicket
  * id (Expecting Integer)
  * batsmanId (Expecting Integer)
  * bowlerId (Expecting Integer)
  * fielderId (Expecting Integer)
  * howOut (Expecting "bowled", "lbw", "handled the ball", "hit wicket", "hit the ball twice", "caught", "stumped", "runout", "obstruction", "timed out")
