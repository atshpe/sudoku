import { useState } from "react"
import move from "../domain/move"
import Key from "../enums/Key"
import useGlobalDOMEvents from "./useGlobalDOMEvents"

export default function useSudokuBoard(initialLayout) {
    const [board, setBoard]                   = useState(initialLayout)
    const [activeCell, setActiveCell]         = useState(null)
    const [lastActiveCell, setlastActiveCell] = useState(null)

    useGlobalDOMEvents('keydown', (e) => {
        if (Key.isArrow(e.key) && activeCell === null) {
            e.preventDefault()
            setActiveCell(
                lastActiveCell ?? move({ row: 0, cell: 0 }, e.key, initialLayout)
            )
        }
    })

    return {
        activeCell,
        layout: board,
        update: (layout) => setBoard(layout),
        focus: (row, cell) => {
            setActiveCell({ row, cell })
            setlastActiveCell(null)
        },
        blur: () => setActiveCell(prev => {
            setlastActiveCell(prev)
            return null
        }),
        move: (direction) => setActiveCell(prev => move(prev, direction, initialLayout))
    }
}