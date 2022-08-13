import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'

import { GENERAL_ERROR } from 'constants/messages'
import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        if (typeof req.query.playerSlug === 'string') {
            try {
                const room = await prisma.room.findUnique({
                    where: {
                        slug: req.query.roomSlug,
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
                // Remove admin role from previous
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
                        slug: req.query.playerSlug,
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
        return res.status(400).json({
            error: 'Invalid Player Slug',
        })
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
