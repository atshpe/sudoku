import { createPositionKey } from "../../helpers"

export default function validateBoard(board) {
    const cols       = Array.from({ length: 9 }, () => [])
    const squares    = Array.from({ length: 9 }, () => [])
    const violations = new Set()

    board.forEach((row, r) => {
        const duplicates = findDuplicates(row)
        if (duplicates.length) {
            duplicates.forEach(c => violations.add(createPositionKey(r, c)))
        }

        row.forEach((value, c) => {
            cols[c][r] = value
            squares[getSquareIndex(r, c)].push(value)
        })
    })


    cols.forEach((col, c) => {
        const duplicates = findDuplicates(col)
        if (duplicates.length) {
            duplicates.forEach(r => violations.add(createPositionKey(r, c)))
        }
    })

    squares.forEach((square, sq) => {
        findDuplicates(square).forEach(squareCell => {
            const startRow = Math.floor(sq / 3) * 3
            const startCol = sq % 3 * 3

            violations.add(createPositionKey(
                startRow + Math.floor(squareCell / 3),
                startCol + squareCell % 3
            ))
        })
    })

    return [...violations]
}

function findDuplicates(set) {
    const seen = new Map()
    const duplicates = new Set()

    set.forEach((number, index) => {
        if (number === 0) return

        if (seen.has(number)) {
            duplicates.add(seen.get(number))
            duplicates.add(index)
        } else {
            seen.set(number, index)
        }
    })

    return [...duplicates]
}

function getSquareIndex(row, cell) {
    return Math.floor(row / 3) * 3 + Math.floor(cell / 3)
}