import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body } = req
    try {
        const room = await prisma.room.findUnique({
            where: {
                slug: body.roomId,
            },
            select: {
                id: true,
            },
        })
        if (room) {
            const player = await prisma.player.create({
                data: {
                    score: 0,
                    name: body.name,
                    emoji: body.emoji,
                    roomId: room.id,
                },
                select: {
                    id: true,
                },
            })
            res.status(200).json({
                id: player.id,
            })
        } else {
            res.status(500).json({
                error: 'Could not find room by provided ID',
            })
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                error: err.message,
            })
        }
    }
}
