const mockDeuce = (game) => {
    let i = 3;
    while (i) {
        game.pointWonBy('dummy-player-1');
        game.pointWonBy('dummy-player-2');
        i -= 1;
    }
};

const mockAdvantage = (game, player) => {
    let i = 3;
    while (i) {
        game.pointWonBy('dummy-player-1');
        game.pointWonBy('dummy-player-2');
        i -= 1;
    }
    game.pointWonBy(player);
};


const mockTieBreakWin = (game, player) => {
    let i = 5;
    while (i) {
        game.pointWonBy('dummy-player-1');
        game.pointWonBy('dummy-player-2');
        i -= 1;
    }
    game.pointWonBy(player);
    return game.pointWonBy(player);
};

const mockSetWin = (set) => {
    let i = 28;
    while (i) {
        set.pointWonBy('dummy-player-1');
        i -= 1;
    }
};

const mockGameWin = (set) => {
    let i = 4;
    while (i) {
        set.pointWonBy('dummy-player-1');
        i -= 1;
    }
};

const mockTieBreak = (set) => {
    let i = 24;
    while (i) {
        set.pointWonBy('dummy-player-1');
        i -= 1;
    }
    i = 24;
    while (i) {
        set.pointWonBy('dummy-player-2');
        i -= 1;
    }
};

module.exports = {
    mockDeuce,
    mockAdvantage,
    mockTieBreakWin,
    mockSetWin,
    mockGameWin,
    mockTieBreak,
};
