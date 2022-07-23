import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (query.roomId && typeof query.roomId === 'string') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomId,
                },
                select: {
                    players: {
                        select: {
                            name: true,
                            emoji: true,
                        },
                    },
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could not find room by provided ID',
                })
            } else {
                return res.status(200).json({ players: room.players })
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: 'Sorry, something went wrong',
                })
            }
        }
    }
}
