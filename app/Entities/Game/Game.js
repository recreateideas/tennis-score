/* eslint-disable class-methods-use-this */
const { helpers } = require('../../utils');

class Game {
    constructor(player1, player2) {
        this.points = {
            [player1]: 0,
            [player2]: 0,
        };
    }

    getPlayersPoints(player) {
        const { points } = this;
        const [adversary] = helpers.findOtherPlayer(points, player);
        const playerPoints = points[player];
        const adversaryPoints = points[adversary];
        return {
            playerPoints,
            adversaryPoints,
        };
    }
}

module.exports = Game;
