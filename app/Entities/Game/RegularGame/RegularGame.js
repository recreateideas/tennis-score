const Game = require('../Game');

class RegularGame extends Game {
    constructor(player1, player2) {
        super();
        this.points = {
            [player1]: 0,
            [player2]: 0,
        };
        this.printPoints = {
            [player1]: 0,
            [player2]: 0,
        };
        this.advantagePlayer = null;
        this.pointsSchema = [0, 15, 30, 40, 'game'];
    }

    getData() {
        return {
            points: this.printPoints,
            advantagePlayer: this.advantagePlayer,
            gameDeuce: this.gameDeuce,
        };
    }

    pointWonBy(player) {
        const { points, printPoints, pointsSchema } = this;
        points[player] += 1;
        printPoints[player] = pointsSchema[points[player]];
        const { playerPoints, adversaryPoints } = this.getPlayersPoints(player);
        const gameWon = playerPoints >= 4 && playerPoints - adversaryPoints >= 2;
        const advantage = playerPoints >= 3 && playerPoints - adversaryPoints === 1;
        this.gameDeuce = playerPoints >= 3 && playerPoints === adversaryPoints;
        this.advantagePlayer = advantage ? player : null;
        return gameWon;
    }
}

module.exports = RegularGame;
