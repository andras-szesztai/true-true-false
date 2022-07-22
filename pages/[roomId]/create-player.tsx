import { useRouter } from 'next/router'

const CreatePlayer = () => {
    const router = useRouter()
    console.log(router.query)

    return <div>Create Player</div>
}

export default CreatePlayer
