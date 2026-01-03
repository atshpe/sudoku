import Key from "../enums/Key"

export default function move(currentPos, direction, initialLayout) {
    if (!Key.isArrow(direction)) {
        throw Error(`Direction should be an arrow key, got: ${direction}`)
    }

    const newPos = calculateNextPosition(direction, currentPos)

    if (initialLayout[newPos.row][newPos.cell] !== 0) {
        return move(newPos, direction, initialLayout)
    }

    return newPos
}

function escapeEdge(position) {
    const START_POSITION = 0
    const END_POSITION = 8

    if (position < START_POSITION) {
        return END_POSITION
    }
    
    if (position > END_POSITION) {
        return START_POSITION
    }

    return position
}

function calculateNextPosition(direction, prevPosition) {
    const { row, cell } = prevPosition

    switch (direction) {
        case Key.UP:    return { row: escapeEdge(row - 1), cell }
        case Key.DOWN:  return { row: escapeEdge(row + 1), cell }
        case Key.LEFT:  return { row, cell: escapeEdge(cell - 1) }
        case Key.RIGHT: return { row, cell: escapeEdge(cell + 1) }
    }
}