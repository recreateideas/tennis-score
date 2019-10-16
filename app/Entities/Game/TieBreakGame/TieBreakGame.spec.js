const Game = require('../Game');
const TieBreakGame = require('./TieBreakGame');
const { mockDeuce, mockTieBreakWin } = require('../../../__mocks__');

describe('Class TieBreakGame', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should return an instance of TieBreakGame', () => {
        const tieBreakGame = new TieBreakGame();
        expect(tieBreakGame).toBeInstanceOf(TieBreakGame);
    });

    it('should return an instance of Game', () => {
        const tieBreakGame = new Game();
        expect(tieBreakGame).toBeInstanceOf(Game);
    });

    it('should throw if not called with 2 players', () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const game = new TieBreakGame('some-wrong-arg');
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('getData - should return the game points', () => {
        const game = new TieBreakGame('dummy-player-1', 'dummy-player-2');
        const expectedData = {
            points: {
                'dummy-player-1': 3,
                'dummy-player-2': 3,
            },
        };
        mockDeuce(game);
        const data = game.getData();
        expect(data).toEqual(expectedData);
    });

    it('pointWonBy - should return whether the game was won or not', () => {
        const game = new TieBreakGame('dummy-player-1', 'dummy-player-2');
        const player = 'dummy-player-2';
        const gameWon = mockTieBreakWin(game, player);
        expect(gameWon).toBe(true);
    });
});
