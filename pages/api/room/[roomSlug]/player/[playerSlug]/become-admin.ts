import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'

import { GENERAL_ERROR } from 'constants/messages'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.playerSlug &&
        typeof query.playerSlug === 'string' &&
        query.roomSlug &&
        typeof query.roomSlug === 'string'
    ) {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                include: {
                    players: {
                        where: {
                            role: Role.ADMIN,
                        },
                        select: {
                            slug: true,
                        },
                    },
                },
            })
            await prisma.player.update({
                where: {
                    slug: room?.players[0].slug,
                },
                data: {
                    role: Role.USER,
                },
                select: {
                    id: true,
                },
            })
            const newAdmin = await prisma.player.update({
                where: {
                    slug: query.playerSlug,
                },
                data: {
                    role: Role.ADMIN,
                },
                select: {
                    id: true,
                },
            })
            if (!newAdmin) {
                return res.status(404).json({
                    error: 'Could Not Assign Admin Role',
                })
            }
            return res.status(200).json({ success: true })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
