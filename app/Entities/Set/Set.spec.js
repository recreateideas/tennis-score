const Set = require('./Set');
const { RegularGame, TieBreakGame } = require('../Game');
const { mockSetWin, mockGameWin, mockTieBreak } = require('../../__mocks__');

describe('Class Set', () => {
    it('should return an instance of Set', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        expect(set).toBeInstanceOf(Set);
    });

    it('should throw if not called with 1 player only', () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const set = new Set('some-wrong-arg');
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('upon instantiation, should create an array of games length 1 with RegularGame as item', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        expect(set.games).toEqual([new RegularGame('dummy-player-1', 'dummy-player-2')]);
    });

    it('upon instantiation, should set its attributes appropriately', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        const expected = {
            activeGame: 0,
            games: [new RegularGame('dummy-player-1', 'dummy-player-2')],
            player1: 'dummy-player-1',
            player2: 'dummy-player-2',
            setsWon: {
                'dummy-player-2': 0,
                'dummy-player-1': 0,
            },
        };
        expect(set).toEqual(expected);
    });

    it('getCurrentGame - should return the data of current game being played', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        const current = set.getCurrentGameData();
        const expected = {
            advantagePlayer: null,
            gameDeuce: undefined,
            points: {
                'dummy-player-2': 0,
                'dummy-player-1': 0,
            },
        };
        expect(current).toEqual(expected);
    });

    it('nextGame - should add a new game type to games accordingly to the type provided', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        set.nextGame('TieBreaker');
        expect(set.games[set.games.length - 1]).toBeInstanceOf(TieBreakGame);
    });

    it('nextGame - should add a new regular game type if no type is provided', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        set.nextGame();
        expect(set.games[set.games.length - 1]).toBeInstanceOf(RegularGame);
    });

    it('getSetResult - should return false (player didn`t win) by default', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        const res = set.getSetResult();
        expect(res).toBe(false);
    });

    it('getSetResult - should return true if player has won the set', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        mockSetWin(set);
        const res = set.getSetResult('dummy-player-1');
        expect(set.games.length).toBe(7);
        expect(res).toBe(true);
    });

    it('getSetResult - should return TieBreaker if its tie', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        mockTieBreak(set);
        const res = set.getSetResult('dummy-player-1');
        expect(res).toBe('TieBreaker');
    });

    it('pointWonBy - should update the setsWon object when the set is won', () => {
        const set = new Set('dummy-player-1', 'dummy-player-2');
        const expected = {
            'dummy-player-2': 0,
            'dummy-player-1': 1,
        };
        mockGameWin(set);
        expect(set.setsWon).toEqual(expected);
    });
});
