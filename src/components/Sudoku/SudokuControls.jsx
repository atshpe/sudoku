import { useHistoryContext } from "../../context/HistoryProvider"
import { Icon } from "@iconify/react"

export default function SudokuControls({ updateBoard }) {
    const { undo, redo } = useHistoryContext()

    const handleUndo = () => updateBoard(undo())
    const handleRedo = () => updateBoard(redo())

    const icon = (icon) => <Icon icon={`material-symbols:${icon}`} />

    return (
        <div className="controls">
            <button className="undo" onClick={handleUndo}>{icon('undo')}</button>
            <button className="redo" onClick={handleRedo}>{icon('redo')}</button>
        </div>
    )
}