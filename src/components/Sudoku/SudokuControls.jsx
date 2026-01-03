import { useHistoryContext } from "../../context/HistoryProvider"
import { Icon } from "@iconify/react"
import useGlobalDOMEvents from "../../hooks/useGlobalDOMEvents"

export default function SudokuControls({ updateBoard }) {
    const { undo, redo } = useHistoryContext()

    useGlobalDOMEvents('keydown', (e) => {
        if (e.ctrlKey) {
            e.key === 'z' && handleUndo()
            e.key === 'Z' && handleRedo()
        }
    })

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