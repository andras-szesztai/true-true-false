import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { generateSlug } from 'utils/slug'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body, method } = req

    if (method === 'POST') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: body.roomSlug,
                },
                select: {
                    id: true,
                },
            })
            if (room) {
                const player = await prisma.player.create({
                    data: {
                        name: body.name,
                        emoji: body.emoji,
                        roomId: room.id,
                        slug: generateSlug(),
                        score: 0,
                        isActive: true,
                        role: body.role,
                    },
                    select: {
                        id: true,
                        slug: true,
                    },
                })
                res.status(200).json({
                    id: player.id,
                })
            } else {
                res.status(500).json({
                    error: 'Could Not Find Room By Provided ID',
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
}