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
* addInnings(battingTeam)
* addOver(bowlerId)
* addBall(batsmanId, runs, wideBall, noBall, byes, legByes, wicket, wagonX, wagonY, pitchX, pitchY, dateTime)
* addWicket(batsmanId, fielderId, howOut)
* undo()
* getInnings(inningId, battingTeam)
* getOvers(inningId, overId, bowlerId)
* getBalls() [COMING SOON]
* getWickets() [COMING SOON]


### Public Variables
* data
  * test
