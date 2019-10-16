const Game = require('../Game');

class TieBreakGame extends Game {
    constructor(player1, player2) {
        super();
        this.points = {
            [player1]: 0,
            [player2]: 0,
        };
    }

    getData() {
        return {
            points: this.points,
        };
    }

    pointWonBy(player) {
        const { points } = this;
        points[player] += 1;
        const { playerPoints, adversaryPoints } = this.getPlayersPoints(player);
        const gameWon = playerPoints >= 7 && playerPoints - adversaryPoints >= 2;
        return gameWon;
    }
}

module.exports = TieBreakGame;
