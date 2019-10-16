const Match = require('./Match');
const Set = require('../Set');
const {
    mockSetWin: mockMatchWin,
    mockGameWin,
    mockDeuce,
    mockAdvantage,
} = require('../../__mocks__');

describe('Class Match', () => {
    it('should return an instance of Match', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        expect(match).toBeInstanceOf(Match);
    });

    it('should throw if not called with 2 players', () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const match = new Match('only-one-player');
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
        }
    });

    it('should create a match with 2 players and 1 set', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        expect(match.player1).toEqual('dummy-player-1');
        expect(match.player2).toEqual('dummy-player-2');
        expect(match.set).toBeInstanceOf(Set);
    });

    it('pointWonBy - should set winner and setsWonn appropriately - (1)', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const expectedSetsWon = {
            'dummy-player-1': 0,
            'dummy-player-2': 0,
        };
        match.pointWonBy('dummy-player-1');
        expect(match.winner).toBe(null);
        expect(match.setsWon).toEqual(expectedSetsWon);
    });

    it('pointWonBy - should set winner appropriately - (2)', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        mockMatchWin(match);
        expect(match.winner).toBe('dummy-player-1');
    });

    it('pointWonBy - should set winner appropriately - (2)', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const expectedSetsWon = {
            'dummy-player-1': 7,
            'dummy-player-2': 0,
        };
        mockMatchWin(match);
        expect(match.setsWon).toEqual(expectedSetsWon);
    });

    it('score - should display a Deuce properly', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const logSpy = jest.spyOn(global.console, 'log');
        mockDeuce(match);
        match.score();
        expect(logSpy).toHaveBeenCalledWith('0-0, Deuce');
    });

    it('score - should display an Advantage properly', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const logSpy = jest.spyOn(global.console, 'log');
        mockAdvantage(match, 'dummy-player-1');
        match.score();
        expect(logSpy).toHaveBeenCalledWith('0-0, Advantage dummy-player-1');
    });

    it('score - should display `regular` score if it`s not Deuce or Advantage', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const logSpy = jest.spyOn(global.console, 'log');
        match.pointWonBy('dummy-player-1');
        match.pointWonBy('dummy-player-2');
        match.score();
        expect(logSpy).toHaveBeenCalledWith('0-0, 15-15');
    });

    it('score - should not display the game points if they are both 0 and set score is not 0-0', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const logSpy = jest.spyOn(global.console, 'log');
        mockGameWin(match);
        match.score();
        expect(logSpy).toHaveBeenCalledWith('1-0');
    });

    it('score - should display the winner when there is one', () => {
        const match = new Match('dummy-player-1', 'dummy-player-2');
        const logSpy = jest.spyOn(global.console, 'log');
        mockMatchWin(match);
        match.score();
        expect(logSpy).toHaveBeenCalledWith(`\n! ${'dummy-player-1'.toUpperCase()} WON THE MATCH !\n`);
    });
});
