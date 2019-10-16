const Game = require('../Game');
const RegularGame = require('./RegularGame');
const { mockDeuce, mockAdvantage } = require('../../../__mocks__');

describe('Class RegularGame', () => {
    it('should return an instance of RegularGame', () => {
        const regularGame = new RegularGame();
        expect(regularGame).toBeInstanceOf(RegularGame);
    });

    it('should return an instance of Game', () => {
        const regularGame = new Game();
        expect(regularGame).toBeInstanceOf(Game);
    });

    it('should throw if not called with 2 players', () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const game = new RegularGame('some-wrong-arg');
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('should default the points attributes to 0, and advantagePlayer to null', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        expect(game.points['dummy-player-1']).toBe(0);
        expect(game.points['dummy-player-2']).toBe(0);
        expect(game.printPoints['dummy-player-1']).toBe(0);
        expect(game.printPoints['dummy-player-2']).toBe(0);
        expect(game.advantagePlayer).toBe(null);
    });

    it('should have pointsSchema as attribute', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        expect(game.pointsSchema).toEqual([0, 15, 30, 40, 'game']);
    });

    it('pointWonBy - should return wether the game was won or not', () => {
        let gameWon;
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        gameWon = game.pointWonBy('dummy-player-1');
        expect(gameWon).toBe(false);
        gameWon = game.pointWonBy('dummy-player-1');
        expect(gameWon).toBe(false);
        gameWon = game.pointWonBy('dummy-player-1');
        expect(gameWon).toBe(false);
        gameWon = game.pointWonBy('dummy-player-1');
        expect(gameWon).toBe(true);
    });

    it('pointWonBy - should save gameDeuce in its attribute', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        mockDeuce(game);
        expect(game.gameDeuce).toBeTruthy();
    });

    it('pointWonBy - should save the player that has the advantage if applicable', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        const player = 'dummy-player-2';
        mockAdvantage(game, player);
        expect(game.advantagePlayer).toBeTruthy();
        expect(game.advantagePlayer).toBe(player);
    });

    it('pointWonBy - should save the player that has the advantage if applicable', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        const player = 'dummy-player-2';
        mockAdvantage(game, player);
        expect(game.advantagePlayer).toBeTruthy();
        expect(game.advantagePlayer).toBe(player);
    });

    it('getData - should return points, advantagePlayer and gameDeuce - (1)', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        const expectedData = {
            advantagePlayer: 'dummy-player-2',
            gameDeuce: false,
            points: {
                'dummy-player-1': 40,
                'dummy-player-2': 'game',
            },
        };
        const player = 'dummy-player-2';
        mockAdvantage(game, player);
        const data = game.getData();
        expect(data).toEqual(expectedData);
    });

    it('getData - should return points, advantagePlayer and gameDeuce - (2)', () => {
        const game = new RegularGame('dummy-player-1', 'dummy-player-2');
        const expectedData = {
            advantagePlayer: null,
            gameDeuce: true,
            points: {
                'dummy-player-1': 40,
                'dummy-player-2': 40,
            },
        };
        mockDeuce(game);
        const data = game.getData();
        expect(data).toEqual(expectedData);
    });
});
