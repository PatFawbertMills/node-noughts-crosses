import { argv } from 'node:process';
import { logBoardForDebug } from './utilities.js';
// Set debug to true if, like me, like to see the board logged nicely ~_~
const debug = false;

/**
 * 1.2 Board Representation
    Boards are represented as strings of length nine, corresponding to the nine slots, starting in the top left slot and counting
    across each row. The character ”X” is used for Crosses, ”O” (letter O) for Noughts,
 * 1.3 Game Rules
    • Crosses always goes first
    • Players must make a move during their turn in one of the empty slots
    • The game ends as soon as either player gets 3 in a row, or there are no empty slots left

 * Either player can win, obviously, we can also draw
 * Invalid game = the state of the board is compromised in some way
 * Broken rules = the noughts and crosses rules have been broken in some way
 * Noughts / crosses turn = indicate who's go is next. I did have 'unfinished game' initially but I didn't like it as it felt less interactive
 */
export enum BoardState {
  NOUGHTS_WIN = 'NOUGHTS_WIN',
  CROSSES_WIN = 'CROSSES_WIN',
  DRAW = 'DRAW',
  INVALID_GAME = 'INVALID_GAME',
  BROKEN_RULES = 'BROKEN_RULES',
  NOUGHTS_TURN = 'NOUGHTS_TURN_NEXT',
  CROSSES_TURN = 'CROSSES_TURN_NEXT',
  // UNFINISHED_GAME = 'UNFINISHED_GAME',
}

type winCondition = [number, number, number];

// Define the win conditions based on the board indeces, i.e. top left space is index 0
const winConditions: winCondition[] = [
  // left-to-right
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // top-down
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

// Couple of little utilities to keep the getStateOfBoard method cleaner
const getResultBasedOnPlayer = (
  player: string,
): BoardState.CROSSES_WIN | BoardState.NOUGHTS_WIN =>
  player === 'X' ? BoardState.CROSSES_WIN : BoardState.NOUGHTS_WIN;

const getNextTurn = (
  crossesCount: number,
  noughtsCount: number,
): BoardState.NOUGHTS_TURN | BoardState.CROSSES_TURN =>
  noughtsCount === crossesCount
    ? BoardState.CROSSES_TURN
    : BoardState.NOUGHTS_TURN;

// Optionally render a 3x3 grid of the game if we are in debug
// The benefit of this approach is we can control of all outputs from a single place
const renderResult = (board: string, result: BoardState): string => {
  return debug ? `${debug ? logBoardForDebug(board) : ''}${result}` : result;
};

export const getStateOfBoard = (board: string): string => {
  // Ensure we validate in order of priority and cost
  // E.g. don't get to the expensive validation until we do the cheap validation
  if (!board || !board.length)
    return renderResult(board, BoardState.INVALID_GAME);
  if (board.length > 9) return renderResult(board, BoardState.INVALID_GAME);
  // I have made the assumption that the board needs to at least supply _ for empty spaces else we can't trust it
  if (board.length !== 9) return renderResult(board, BoardState.INVALID_GAME);

  // Ensure we have predictable data from here
  // From this point onwards I don't want to need to do .toUpperCase() on all string checks
  board = board.toUpperCase();
  // Ensure we only have X, O and _ in our board
  if ((board.match(/[^XO_]/g) || []).length)
    return renderResult(board, BoardState.INVALID_GAME);
  const noughtsCount = (board.match(/O/g) || []).length;
  const crossesCount = (board.match(/X/g) || []).length;
  const blanksCount = (board.match(/_/g) || []).length;
  // X must always go first - so there should be no chance to have more O's than X's on the board
  if (noughtsCount > crossesCount)
    return renderResult(board, BoardState.BROKEN_RULES);
  // Similarly X should never deviate beyond one turn from O's
  if (crossesCount > noughtsCount + 1)
    return renderResult(board, BoardState.BROKEN_RULES);
  // Need at least 3 go's to have the potential for a win
  if (noughtsCount < 3 && crossesCount < 3)
    return renderResult(board, getNextTurn(crossesCount, noughtsCount));

  /**
   * We know that each combination of a winning board follows the convention of [x, y, z] where x, y, z represent indexes in the board string
   * e.g. to win diagonally from top left to bottom right would be = [0, 4, 8]
   * So now we can check these for a winning match
   * 'for of' isn't the most performant but the winConditions array only holds 8 values and for readability's sake I like it
   */
  for (const condition of winConditions) {
    if (
      board[condition[0]] !== '_' &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    )
      return renderResult(board, getResultBasedOnPlayer(board[condition[0]]));
  }

  // If we still have blank spaces and no one has won, we can assume the game has not finished yet
  if (blanksCount)
    return renderResult(board, getNextTurn(crossesCount, noughtsCount));

  // If no one has won then we can assume the game is a draw
  return renderResult(board, BoardState.DRAW);
};

// Process argv is for handling command-line arguments
argv.forEach((val, index) => {
  // In node the first two arguments return from argv are the process.execpath and the path to the file being executed, which we aren't interested in for this test
  // https://nodejs.org/docs/latest/api/process.html#process_process_argv
  if ([0, 1].includes(index)) return;
  console.log(getStateOfBoard(val));
});
