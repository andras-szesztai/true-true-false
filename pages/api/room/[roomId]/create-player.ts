import { NextApiRequest } from 'next'
// } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest
    // res: NextApiResponse
) {
    const { body } = req
    console.log(body)

    // try {
    //     const player = await prisma.player.create({
    //         data: {
    //             score: 0,
    //         },
    //     })
    //     return player
    // } catch (err) {
    //     if (err instanceof Error) {
    //         if (err.message.includes(DUPLICATE_ERROR)) {
    //             createRoom() // Regenerate slug
    //         } else {
    //             return err.message
    //         }
    //     }
    // }
}
