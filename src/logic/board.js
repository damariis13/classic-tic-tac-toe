import { COMBOS_WINNER } from "../constants.js"

export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O gano
    for (const combo of COMBOS_WINNER) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }