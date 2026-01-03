import Sudoku from './components/Sudoku/Sudoku'
import { HistoryProvider } from './context/HistoryProvider'
import useLevelsLoader from './hooks/useLevelsLoader'

export default function App() {
    const queryParams = new URLSearchParams(window.location.search)
    const level       = Number(queryParams.get('level') ?? 1)
    
    const { boardLayout, error } = useLevelsLoader(level)

    if (error) {
        alert('You\'re not ready for this yet.')
    } else if (!boardLayout) {
        return '...loading'
    }

    return (
        <HistoryProvider initial={boardLayout}>
            <Sudoku initialBoard={boardLayout} />
        </HistoryProvider>
    )
}