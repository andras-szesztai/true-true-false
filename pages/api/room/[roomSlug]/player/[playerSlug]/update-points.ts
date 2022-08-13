import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { PlayerPoint } from 'types/points'

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
                    select: {
                        players: {
                            where: {
                                slug: req.query.playerSlug,
                            },
                            select: {
                                role: true,
                            },
                        },
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided Room Slug',
                    })
                }
                const player = room.players[0]
                if (!player) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                }
                if (player.role !== Role.ADMIN) {
                    return res.status(404).json({
                        error: 'Only Admin Users Can Update Scores',
                    })
                }
                await Promise.all(
                    req.body.map(async (player: PlayerPoint) => {
                        await prisma.player.update({
                            where: {
                                id: player.playerId,
                            },
                            data: {
                                score: player.score,
                            },
                        })
                    })
                )
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
