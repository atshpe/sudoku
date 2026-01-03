import { useState, createContext, useContext } from "react"

const HistoryContext = createContext()

export function HistoryProvider({ initial, children }) {
    const [history, setHistory]   = useState([initial])
    const [position, setPosition] = useState(0)

    const recordHistory = (state) => {
        setHistory(prev => {
            if (JSON.stringify(prev[position]) === JSON.stringify(state)) {
                // do not make a snapshot if nothing changed
                return prev
            }

            const sliced = prev.slice(position)
            
            return [state, ...sliced]
        })
        setPosition(0)
    }

    const undo = () => {
        if (position < history.length - 1) {
            const pos = position + 1
            setPosition(pos)
            return history[pos]
        }

        return history[position]
    }

    const redo = () => {
        if (position > 0) {
            const pos = position - 1
            setPosition(pos)
            return history[pos]
        }

        return history[0] ?? null
    }

    return (
        <HistoryContext.Provider value={{ recordHistory, undo, redo }}>
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistoryContext = () => useContext(HistoryContext)