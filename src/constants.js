// primero necesitamos saber de quien es el turno
// para eso necesitamos crear otro estado
export const TURNS = {
    X: '❌',
    O: '⚪'
  }
  
  export const COMBOS_WINNER = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [2,4,6],
    [0,4,8],
    [1,4,7]
  ]