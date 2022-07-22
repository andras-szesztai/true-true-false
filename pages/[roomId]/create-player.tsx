import { useRouter } from 'next/router'

const CreatePlayer = () => {
    const { query } = useRouter()
    return <div>{query.roomId}</div>
}

export default CreatePlayer
