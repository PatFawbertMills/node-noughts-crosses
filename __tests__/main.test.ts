import { BoardState, getStateOfBoard } from '../src/main.js';

// Collection of test boards
const boards = {
  blank: '',
  badFormat: 'badformat',
  tooShort: 'XOX',
  tooLong: 'XOXOOXXOXO',
  noughtsFirst: 'OOOXX____',
  crossesTooMany: 'XOXOXX___',
  lowercaseOK: 'xoxxoooxx',
  crossesNext: 'OX_______',
  noughtsNext: 'X________',
  crossesWin: 'XXXOXOO__',
  noughtsWin: 'XXOXOXO__',
  draw: 'XOXXXOOXO',
  freshGame: '_________',
  realGame1: '________X',
  realGame2: 'O_______X',
  realGame3: 'O____X__X',
  realGame4: 'O_O__X__X',
  realGame5: 'OXO__X__X',
  realGame6: 'OXO_OX__X',
  realGame7: 'OXO_OX_XX',
  realGame8: 'OXO_OXOXX',
};

// TDD formatted test scripts
// Black-box testing or I/O testing. I am not interested in 'how' the code works, just that it gives me the result I want
describe('getStateofBoard()', () => {
  it('invalid when passed blank', () => {
    expect(getStateOfBoard(boards.blank)).toBe(BoardState.INVALID_GAME);
  });
  // nice bit off TDD here because I had missed it and wasn't handling this before i wrote the test
  it('invalid when passed badly formatted data', () => {
    expect(getStateOfBoard(boards.badFormat)).toBe(BoardState.INVALID_GAME);
  });
  it('invalid board is too short', () => {
    expect(getStateOfBoard(boards.tooShort)).toBe(BoardState.INVALID_GAME);
  });
  it('invalid board is too long', () => {
    expect(getStateOfBoard(boards.tooLong)).toBe(BoardState.INVALID_GAME);
  });
  it('broken the rules if noughts go first', () => {
    expect(getStateOfBoard(boards.noughtsFirst)).toBe(BoardState.BROKEN_RULES);
  });
  it('broken the rules if crosses taken extra turn', () => {
    expect(getStateOfBoard(boards.crossesTooMany)).toBe(
      BoardState.BROKEN_RULES,
    );
  });
  it('handle lower case string', () => {
    expect(getStateOfBoard(boards.lowercaseOK)).toBe(BoardState.DRAW);
  });

  it('crosses next turn', () => {
    expect(getStateOfBoard(boards.crossesNext)).toBe(BoardState.CROSSES_TURN);
  });
  it('noughts next turn', () => {
    expect(getStateOfBoard(boards.noughtsNext)).toBe(BoardState.NOUGHTS_TURN);
  });
  it('crosses win', () => {
    expect(getStateOfBoard(boards.crossesWin)).toBe(BoardState.CROSSES_WIN);
  });
  it('noughts win', () => {
    expect(getStateOfBoard(boards.noughtsWin)).toBe(BoardState.NOUGHTS_WIN);
  });
  it('draw if no winner', () => {
    expect(getStateOfBoard(boards.draw)).toBe(BoardState.DRAW);
  });
  it('fresh game, no turns taken yet', () => {
    expect(getStateOfBoard(boards.freshGame)).toBe(BoardState.CROSSES_TURN);
  });
  it('real incremental game turn 1, X has taken first turn', () => {
    expect(getStateOfBoard(boards.realGame1)).toBe(BoardState.NOUGHTS_TURN);
  });
  it('real incremental game turn 2, O has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame2)).toBe(BoardState.CROSSES_TURN);
  });
  it('real incremental game turn 3, X has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame3)).toBe(BoardState.NOUGHTS_TURN);
  });
  it('real incremental game turn 4, O has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame4)).toBe(BoardState.CROSSES_TURN);
  });
  it('real incremental game turn 5, X has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame5)).toBe(BoardState.NOUGHTS_TURN);
  });
  it('real incremental game turn 6, O has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame6)).toBe(BoardState.CROSSES_TURN);
  });
  it('real incremental game turn 7, X has taken a turn', () => {
    expect(getStateOfBoard(boards.realGame7)).toBe(BoardState.NOUGHTS_TURN);
  });
  it('real incremental game turn 8, O wins', () => {
    expect(getStateOfBoard(boards.realGame8)).toBe(BoardState.NOUGHTS_WIN);
  });
});
