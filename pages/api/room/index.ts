import { NextApiRequest, NextApiResponse } from 'next'
import { generateRoomId } from 'utils/roomId'
import { prisma } from 'utils/prisma'

const DUPLICATE_ERROR = 'Unique constraint failed on the fields: (`slug`)'

const createRoom = async () => {
    const roomId = generateRoomId()
    try {
        const room = await prisma.room.create({
            data: {
                slug: roomId,
            },
        })
        return room
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes(DUPLICATE_ERROR)) {
                createRoom() // Regenerate slug
            } else {
                return err.message
            }
        }
    }
}

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const result = await createRoom()
    if (result && typeof result !== 'string') {
        return res.status(200).json({ data: result })
    }
    return res.status(500).json({ error: 'Something went wrong' })
}
