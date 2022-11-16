import { useEffect, useState } from "react"

export default (key, init = '') => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || init
    })
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value])
    return [value, setValue]
}