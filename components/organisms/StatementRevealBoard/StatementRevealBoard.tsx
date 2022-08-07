import React from 'react'

import { Props } from './types'

const StatementSelectionBoard = ({ statements, revealAnswer }: Props) => {
    console.log({ revealAnswer, statements })

    // const [selectedId, setSelectedId] = useState<number | null>(null)

    // const [submitState, submitSelectedStatement] = useAsyncFn(async () => {
    //     const response = await fetch(
    //         `/api/room/${roomSlug}/player/${playerSlug}/select-statement/${selectedId}`
    //     )
    //     const result = await response.json()
    //     return result
    // }, [selectedId])

    // if (isLoading) return <div>Loading...</div>

    // if (!statements || error)
    //     return <ScreenMessage text={error?.message || GENERAL_ERROR} />

    // if ('error' in statements) return <ScreenMessage text={statements.error} />

    // if ((submitState.value && 'success' in submitState.value) || isPlayerReady)
    //     return (
    //         <ScreenMessage
    //             text={
    //                 isAllReady
    //                     ? 'Everyone is ready! 🚀'
    //                     : 'Waiting for Others to Select ⏳'
    //             }
    //         />
    //     )

    return <div>RevealBoard</div>
}

export default StatementSelectionBoard
