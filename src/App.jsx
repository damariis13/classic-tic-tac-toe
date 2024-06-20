import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import Square from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner } from './logic/board.js'
import WinnerModal from './components/WinnerModal.jsx'
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  // Hacemos que empiece primero el turno de X
  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) //null es que no hay ganador, false es que hay un empate

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    window.localStorage.setItem('turn', turn);
  }, [turn]);

  const updateBoard = (index) => {
    // No hay que actualizar si ya existe algun dato
    // el return significa -> no hace nada 
    if (board[index] || winner) return 
    // actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn // se almacena la X u O
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti() // cuando voy a ganar primero sale el alert en vez de la X primero
      // por que sucede esto??
      // Concepto clave de React. La actualizacion de los estados en React son ASINCRONAS
      // alert(`El ganador es ${newWinner}`)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square !== null) 
  }

  return (
    <main className='board'>
      <h1>TIC TAE TOE</h1>
      <button onClick={resetGame}>Reset juego</button>
      <section className='game'>
        {
          // la primera posicion es el square
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                // NO QUEREMOS ejecutar {updateBoard()} la funcion cuando se renderiza
                // queremos ejecutar solo cuando haga un click el usuario por eso se la pasamos como parametro
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      { winner !== null && (
        <WinnerModal winner={winner} resetGame={resetGame} />
      )}
    </main>
  )
}

export default App
