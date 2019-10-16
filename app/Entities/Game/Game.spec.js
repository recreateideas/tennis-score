const Game = require('./Game');

describe('Class Game', () => {
    it('should instantiate a Game', () => {
        const game = new Game('player1', 'dummy-player-2');
        expect(game).toBeInstanceOf(Game);
    });

    it('should throw if not called with 2 players', () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const game = new Game('some-wrong-arg');
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('should default the points attributes to 0', () => {
        const game = new Game('dummy-player-1', 'dummy-player-2');
        expect(game.points['dummy-player-1']).toBe(0);
        expect(game.points['dummy-player-2']).toBe(0);
    });

    it('getPlayersPoints - should return the player`s points devided in player and adversary', () => {
        const game = new Game('dummy-player-1', 'dummy-player-2');
        const expected = { adversaryPoints: 0, playerPoints: 0 };
        const points = game.getPlayersPoints('dummy-player-1');
        expect(points).toEqual(expected);
    });
});
