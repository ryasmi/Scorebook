# [Scorebook](https://www.github.com/ryansmith94/Scorebook)
A JavaScript library for cricket scoring created for use in cricket scoring applications and cricket games that require scoring. The library is incredibly flexible allowing for different rules sets, match lengths and includes options for recording the pitch of the ball while bowling and where the ball goes whilst batting. This can provide useful statistics and allow the creation of wagon wheels and the like.

[This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.](http://creativecommons.org/licenses/by-nc-sa/3.0/)

## 1 Contributing
1. Go to [issues](https://github.com/ryansmith94/Scorebook/issues?state=open "/issues") and see if there is anything that needs doing.
2. Familiarise yourself with the files you will be working with.
3. Read the [code styling guidlines](https://github.com/ryansmith94/Scorebook/blob/master/STYLE.md "STYLE.md").
4. [Fork](https://github.com/ryansmith94/Scorebook/fork "/fork") the project so that you have your own copy of the repository.
5. Make the updates you'd like to make on your copy of the repository.
6. Make a [pull request](https://github.com/ryansmith94/Scorebook/pull/new/master "/pull-request").

### 1.1 Testing
When testing you should use [testing.js](https://github.com/ryansmith94/Scorebook/blob/master/src/testing.js) to make automated tests so that every test can be ran after each build.

1. Run `grunt dev` to create the test file or `grunt` to create the release file.
2. Run `node build\test.min.js` to test the file or use `build/Scorebook.min.js` to use the release file (see step 3).

*Ensure that you have both node and grunt installed.*

### 1.2 Installing Node.
Go to [Node JS Website](http://www.nodejs.org/).

### 1.3 Installing Grunt.
Run `npm install -g grunt`.

*Ensure that you have node installed first.*


## 2 Library
### 2.1 How To Use It
1. Download/copy [Scorebook.min.js](https://github.com/ryansmith94/Scorebook/blob/master/build/Scorebook.min.js) from the master branch or from the latest tag [v0.2.18](https://github.com/ryansmith94/Scorebook/tree/v0.2.18/build/Scorebook.min.js).
2. Make a link to the downloaded file in your project.
3. To create a new match use (polyfill can be found at [Douglas Crockford's blog](http://javascript.crockford.com/prototypal.html)):

        // Polyfill for create method.
        if (typeof Object.create !== 'function') {
            Object.create = function (o) {
                function F() {}
                F.prototype = o;
                return new F();
            };
        }
        
        // Create new instance.
        foobar = Object.create(scorebook());


### 2.2 Public Functions
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

### 2.3 Public Variables
* data *(Object)*
  * innings *(Array of type Inning)*
  * overs *(Array of type Over)*
  * balls *(Array of type Ball)*
  * wickets *(Array of type Wicket)*

### 2.4 Classes
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
