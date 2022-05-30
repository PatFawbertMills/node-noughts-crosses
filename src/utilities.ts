// Simple debug for rendering the board in the naughts and crosses display (for debug only)
export const logBoardForDebug = (board: string) =>
  `${board.slice(0, 3)}
${board.slice(3, 6)}
${board.slice(6, 9)}`;
