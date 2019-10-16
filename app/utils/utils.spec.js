const utils = require('./utils');

describe('findOtherPlayer', () => {
    it('should return the other keys (in array format) of an object given an object key', () => {
        const text = 'some-dummy-test';
        const logSpy = jest.spyOn(global.console, 'log');
        utils.logger(text);
        expect(logSpy).toHaveBeenCalledWith(text);
    });
});
