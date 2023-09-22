import { useEffect, useState } from "react"
const useDebounce = value => {
    const [debouncedValue, setDebouncedValue] = useState("")
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), 1000)
        return () => clearTimeout(timer)
    }, [value])
    return debouncedValue
}
export default useDebounce
