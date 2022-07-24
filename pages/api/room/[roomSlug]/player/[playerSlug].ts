import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req

    if (
        method === 'GET' &&
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.playerSlug &&
        typeof query.playerSlug === 'string'
    ) {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                select: {
                    id: true,
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided Room Slug',
                })
            } else {
                const player = await prisma.player.findFirst({
                    where: {
                        roomId: room.id,
                        slug: query.playerSlug,
                    },
                    select: {
                        id: true,
                        slug: true,
                    },
                })
                if (!player) {
                    res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                } else {
                    return res
                        .status(200)
                        .json({ slug: player.slug, id: player.id })
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: 'Sorry, Something Went Wrong',
                })
            }
        }
    }
}
