import { useEffect } from "react"

export default function useGlobalDOMEvents(eventType, eventListener) {
    useEffect(() => {
        document.addEventListener(eventType, eventListener)

        return () => {
            document.removeEventListener(eventType, eventListener)
        }
    }, [eventType, eventListener])
}