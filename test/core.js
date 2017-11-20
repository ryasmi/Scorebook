/* jshint maxstatements: false, node: true */
/* global describe */
/* global it */
/* global before */
(function () {
    'use strict';
    var expect = require('chai').expect;

    describe('scorebook()', function () {
        var scorebook = require('../src/core.js').scorebook;
        var battingTeam = {name: 'Test CC'};
        var bowler = {name: 'Joe Bloggs'};
        var batsman = {name: 'John Smith'};
        var runs = 0;
        var howOut = 'Caught';
        var fielder = {name: 'Magic Bob'};
        var innings = {battingTeam: battingTeam, parent: {}};
        var over = {bowler: bowler, parent: innings};
        var ball = {batsman: batsman, runs: runs, parent: over};
        var wicket = {batsman: batsman, howOut: howOut, fielder: fielder, parent: ball, children: []};

        innings.children = [over];
        over.children = [ball];
        ball.children = [wicket];

        before(function () {
            expect(scorebook).to.be.a('function');
        });

        describe('addInnings()', function () {
            var s = scorebook();

            before(function () {
                expect(s.addInnings).to.be.a('function');
            });

            it('should create an innings', function () {
                s.addInnings(battingTeam);
                expect(s.innings[0].battingTeam).to.be.equal(battingTeam);
            });
        });

        describe('addOver()', function () {
            var s = scorebook();

            before(function () {
                expect(s.addOver).to.be.a('function');
                s.innings.push(innings);
            });

            it('should create an over', function () {
                s.addOver(bowler);
                expect(s.overs[0].bowler).to.be.equal(bowler);
                expect(s.overs[0].parent).to.be.equal(innings);
            });
        });

        describe('addBall()', function () {
            var s = scorebook();

            before(function () {
                expect(s.addBall).to.be.a('function');
                s.innings.push(innings);
                s.overs.push(over);
            });

            it('should create a ball', function () {
                s.addBall(runs, batsman);
                expect(s.balls[0].batsman).to.be.equal(batsman);
                expect(s.balls[0].runs).to.be.equal(runs);
                expect(s.balls[0].wideBall).to.be.equal(false);
                expect(s.balls[0].noBall).to.be.equal(false);
                expect(s.balls[0].byes).to.be.equal(false);
                expect(s.balls[0].legByes).to.be.equal(false);
                expect(s.balls[0].wagonX).to.be.equal(0);
                expect(s.balls[0].wagonY).to.be.equal(0);
                expect(s.balls[0].pitchX).to.be.equal(0);
                expect(s.balls[0].pitchY).to.be.equal(0);
                expect(s.balls[0].batPen).to.be.equal(0);
                expect(s.balls[0].bwlPen).to.be.equal(0);
                expect(s.balls[0].parent).to.be.equal(over);
            });
        });

        describe('addWicket()', function () {
            var s = scorebook();

            before(function () {
                expect(s.addWicket).to.be.a('function');
                s.innings.push(innings);
                s.overs.push(over);
                s.balls.push(ball);
            });

            it('should create a wicket', function () {
                s.addWicket(batsman, howOut, fielder);
                expect(s.wickets[0].batsman).to.be.equal(batsman);
                expect(s.wickets[0].howOut).to.be.equal(howOut);
                expect(s.wickets[0].fielder).to.be.equal(fielder);
                expect(s.wickets[0].parent).to.be.equal(ball);
            });
        });

        describe('getInnings()', function () {
            var s = scorebook();

            before(function () {
                expect(s.getInnings).to.be.a('function');
                s.innings.push(innings);
            });

            it('should get innings', function () {
                expect(s.getInnings({battingTeam: battingTeam})[0]).to.be.equal(innings);
            });
        });

        describe('getOvers()', function () {
            var s = scorebook();

            before(function () {
                expect(s.getOvers).to.be.a('function');
                s.innings.push(innings);
                s.overs.push(over);
            });

            it('should get overs', function () {
                expect(s.getOvers({bowler: bowler})[0]).to.be.equal(over);
            });
        });

        describe('getBalls()', function () {
            var s = scorebook();

            before(function () {
                expect(s.getBalls).to.be.a('function');
                s.innings.push(innings);
                s.overs.push(over);
                s.balls.push(ball);
            });

            it('should get balls', function () {
                expect(s.getBalls({batsman: batsman})[0]).to.be.equal(ball);
            });
        });

        describe('getWickets()', function () {
            var s = scorebook();

            before(function () {
                expect(s.getWickets).to.be.a('function');
                s.innings.push(innings);
                s.overs.push(over);
                s.balls.push(ball);
                s.wickets.push(wicket);
            });

            it('should get wickets', function () {
                expect(s.getWickets({batsman: batsman})[0]).to.be.equal(wicket);
            });
        });

        describe('undo()', function () {
            before(function () {
                var s = scorebook();
                expect(s.undo).to.be.a('function');
            });

            it('should undo wickets', function () {
                var s = scorebook();
                s.innings.push(innings);
                s.overs.push(over);
                s.balls.push(ball);
                s.wickets.push(wicket);
                s.undo();
                expect(s.wickets.length).to.be.equal(0);
            });

            it('should undo balls', function () {
                var s = scorebook();
                s.innings.push(innings);
                s.overs.push(over);
                s.balls.push(ball);
                s.undo();
                expect(s.balls.length).to.be.equal(0);
            });

            it('should undo overs', function () {
                var s = scorebook();
                s.innings.push(innings);
                s.overs.push(over);
                s.undo();
                expect(s.overs.length).to.be.equal(0);
            });

            it('should undo innings', function () {
                var s = scorebook();
                s.innings.push(innings);
                s.undo();
                expect(s.innings.length).to.be.equal(0);
            });
        });
    });
}());
