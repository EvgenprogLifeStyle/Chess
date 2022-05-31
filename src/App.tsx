import React, {useEffect, useState} from 'react'
import './App.scss';
import BoardComponent from "./components/BoardComponent/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures/LostFigures";
import Timer from "./components/Timer/Timer";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    function restart() {
        const newBoard = new Board()
        newBoard.initCell()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    return (
        <div className="App">
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}/>
            <div className="App__controls">
                <div className="App__timer">
                    <Timer currentPlayer={currentPlayer} restart={restart}/>
                </div>
                <div className="App__lost">
                    <LostFigures title="Черные фигуры" figures={board.lostBlackFigures}/>
                    <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures}/>
                </div>
            </div>
        </div>
    );
}

export default App;
