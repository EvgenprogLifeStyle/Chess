import React, {FC, useEffect, useState} from 'react';
import {Board} from "../../models/Board";
import CellComponent from "../CellComponent/CellComponent";
import {Cell} from "../../models/Cell";
import {Player} from "../../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const numeric = [1, 2, 3, 4, 5, 6, 7, 8]
    const lang = ["a", "b", "c", "d", "e", "f", "g", "h"]

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3 className="title__top">Ход <span style={{background: currentPlayer?.color}}></span>  игрока</h3>
            <div className="board">
                <div className="board__body">
                    <div className="board__cell">
                        {board.cells.map((row, index) =>
                            <React.Fragment key={index}>
                                {row.map(cell =>
                                    <CellComponent
                                        click={click}
                                        key={cell.id}
                                        cell={cell}
                                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </div>
                    <div className="board__number">
                        {numeric.reverse().map((num,idx) =>
                            <div key={idx}>{num}</div>
                        )}
                    </div>
                </div>
                <div className="board__lang">
                    {lang.map((lan, idx) =>
                        <div key={idx}>{lan}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoardComponent;