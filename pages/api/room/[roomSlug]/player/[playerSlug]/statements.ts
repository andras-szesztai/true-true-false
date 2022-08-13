import { NextApiRequest, NextApiResponse } from 'next'
import { Statement } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

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
                                id: true,
                            },
                        },
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided Room Slug',
                    })
                }
                if (!room.players[0]) {
                    return res.status(404).json({
                        error: 'Could Not Find Player By Provided Player Slug',
                    })
                }
                const statements = await prisma.statement.createMany({
                    data: req.body.map(
                        (d: Pick<Statement, 'text' | 'isTrue'>) => ({
                            ...d,
                            playerId: room.players[0].id,
                        })
                    ),
                })
                if (!statements) {
                    return res.status(404).json({
                        error: 'Could Not Add Statements to Database',
                    })
                }
                await prisma.player.update({
                    where: {
                        slug: req.query.playerSlug,
                    },
                    data: {
                        showLoading: false,
                    },
                })
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
