# [Scorebook](https://www.github.com/ryansmith94/Scorebook)
A cricket scoring library.


## Using the Scorebook library
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
