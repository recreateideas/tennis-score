const { RegularGame, TieBreakGame } = require('../Game');
const { helpers: { findOtherPlayer } } = require('../../utils');

class Set {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.activeGame = 0;
        this.games = [new RegularGame(player1, player2)];
        this.setsWon = {
            [player1]: 0,
            [player2]: 0,
        };
    }

    getCurrentGame() {
        return this.games[this.activeGame];
    }

    getCurrentGameData() {
        const currentGame = this.getCurrentGame();
        return currentGame.getData();
    }

    nextGame(type) {
        const { player1, player2 } = this;
        this.activeGame += 1;
        let newGame;
        switch (type) {
            case 'TieBreaker':
                newGame = new TieBreakGame(player1, player2);
                break;
            default:
                newGame = new RegularGame(player1, player2);
                break;
        }
        this.games.push(newGame);
    }

    getSetResult(player) {
        const setsWonByPlayer = this.setsWon[player];
        const adversary = findOtherPlayer(this.setsWon, player);
        const setsWonByAdversary = this.setsWon[adversary];
        if (setsWonByPlayer === 6 && setsWonByAdversary === 6) {
            return 'TieBreaker';
        }
        if (setsWonByPlayer >= 6 && setsWonByPlayer - setsWonByAdversary >= 2) {
            return true;
        }
        return false;
    }

    pointWonBy(player) {
        const { games, setsWon, activeGame } = this;
        const gameWon = games[activeGame].pointWonBy(player);
        if (gameWon) {
            setsWon[player] += 1;
            const setResult = this.getSetResult(player);
            if (Object.values(setsWon).every((setPoints) => setPoints < 7)) {
                this.nextGame(setResult);
            } else {
                return {
                    setsWon,
                    winner: player,
                };
            }
        }
        return {
            setsWon,
        };
    }
}

module.exports = Set;
