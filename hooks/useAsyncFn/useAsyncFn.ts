import { useCallback, useState } from 'react'
import { useToggle } from 'react-use'

export const useAsyncFn = <T>(fetcher: () => Promise<Response>) => {
    const [loading, setLoading] = useToggle(false)
    const [error, setError] = useState('')
    const [data, setData] = useState<T | null>(null)

    const asyncFn = useCallback(async () => {
        setLoading()
        setError('')
        try {
            const response = await fetcher()
            const result = await response.json()
            if ('error' in result) {
                setData(null)
                setError(result.error)
            } else {
                setError('')
                setData(result)
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
        } finally {
            setLoading()
        }
    }, [fetcher, setLoading])

    return [asyncFn, { loading, data, error }] as const
}
