import SudokuControls from './SudokuControls'
import { useHistoryContext } from '../../context/HistoryProvider'
import useValidation from '../../hooks/useValidation'
import Cell from './Cell'
import useSudokuBoard from '../../hooks/useSudokuBoard'
import './Sudoku.css'

export default function Sudoku({ initialBoard }) {
    const { recordHistory } = useHistoryContext()
    const { validate, detectViolations } = useValidation()
    const board = useSudokuBoard(initialBoard)
    const activeCell = board.activeCell

    const insertValue = (value) => {
        const newBoard = structuredClone(board.layout)
        newBoard[activeCell.row][activeCell.cell] = value

        recordHistory(newBoard)
        updateBoard(newBoard)
    }

    const updateBoard = (layout) => {
        if (layout) {
            validate(layout)
            board.update(layout)
        }
    }

    return (
        <div className='game'>
            <h1>SUDOKU</h1>
            <div className='sudoku-board'>
                {board.layout.map((row, r) => <div key={r} data-index={r} className='row'>
                    {row.map((number, c) => <Cell
                        key={c}
                        coordinates={{ row: r, cell: c }}
                        value={number || ''}
                        given={number > 0 && number === initialBoard[r][c]}
                        active={activeCell?.row === r && activeCell?.cell === c}
                        violated={detectViolations(r, c)}
                        handleChange={insertValue}
                        handleFocus={(e) => e ? board.focus(r, c) : board.blur()}
                        handleMove={board.move}
                    />)}
                </div>)}
            </div>

            <SudokuControls updateBoard={updateBoard} />
        </div>
    )
}
