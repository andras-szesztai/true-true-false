import { useAsync } from 'react-use'

const CreateRoom = () => {
    const state = useAsync(async () => {
        const response = await fetch('/api/room', { method: 'POST' })
        const result = await response.json()
        return result
    }, [])
    console.log(state)
    if (!state) return <div>Creating room, please wait . . .</div>
    if (state.error) return <div>{state.error.message}</div>
    if (state) return <div>Your room is ready</div>
}

export default CreateRoom
