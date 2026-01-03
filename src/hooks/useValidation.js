import { useState } from "react"
import validateBoard from "../domain/validation/validateBoard"
import { createPositionKey } from "../helpers"

export default function useValidation() {
    const [violations, setViolations] = useState([])

    const validate = (board) => setViolations(validateBoard(board))
    const detectViolations = (row, cell) => violations?.includes(createPositionKey(row, cell))

    return { validate, detectViolations }
}