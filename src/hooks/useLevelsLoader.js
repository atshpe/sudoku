import { useState } from "react"

export default function useLevelsLoader(level = 1) {
    const [boardLayout, setBoardLayout] = useState(null)
    const [error, setError] = useState(null);

    import(`../levels/level_${level}.js`)
        .then(module => setBoardLayout(module.default))
        .catch(setError)

    return { boardLayout, error }
}