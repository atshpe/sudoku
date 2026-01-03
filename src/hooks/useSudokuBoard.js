import { useState } from "react"
import move from "../domain/move"

export default function useSudokuBoard(initialLayout) {
    const [board, setBoard]           = useState(initialLayout)
    const [activeCell, setActiveCell] = useState(null)

    return {
        activeCell,
        layout: board,
        update: (layout)    => setBoard(layout),
        focus:  (row, cell) => setActiveCell({ row, cell }),
        blur:   ()          => setActiveCell(null),
        move:   (direction) => setActiveCell(prev => move(prev, direction, initialLayout))
    }
}