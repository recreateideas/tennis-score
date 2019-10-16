const helpers = require('./helpers');

describe('findOtherPlayer', () => {
    it('should return the other keys (in array format) of an object given an object key', () => {
        const object = {
            a: 'b',
            c: 'd',
            e: 'f',
        };
        const res = helpers.findOtherPlayer(object, 'a');
        expect(res).toEqual(['c', 'e']);
    });
});
