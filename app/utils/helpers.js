/**
 * @ returns other player given a player
 * @param {*} points current score of the game
 * @param {*} player player to find the adversary of
 */
const findOtherPlayer = (points, player) => Object
    .keys(points)
    .filter((person) => person !== player);

module.exports = {
    findOtherPlayer,
};
