const Set = require('../Set');
const { utils: { logger } } = require('../../utils');

class Match {
    constructor(p1, p2) {
        this.player1 = p1;
        this.player2 = p2;
        this.set = new Set(p1, p2);
    }

    pointWonBy(player) {
        const {
            winner,
            setsWon,
        } = this.set.pointWonBy(player);
        this.winner = winner || null;
        this.setsWon = setsWon;
    }

    score() {
        let displayPoints;
        const { winner } = this;
        const { points, gameDeuce, advantagePlayer } = this.set.getCurrentGameData();
        const setScores = `${this.setsWon[this.player1]}-${this.setsWon[this.player2]}`;
        if (gameDeuce) {
            displayPoints = ', Deuce';
        } else if (advantagePlayer) {
            displayPoints = `, Advantage ${advantagePlayer}`;
        } else if (points[this.player1] === 0 && points[this.player2] === 0 && setScores !== '0-0') {
            displayPoints = '';
        } else {
            displayPoints = `, ${points[this.player1]}-${points[this.player2]}`;
        }
        logger(`${setScores}${displayPoints}`);
        if (winner) {
            logger(`\n! ${winner.toUpperCase()} WON THE MATCH !\n`);
        }
    }
}

module.exports = Match;
