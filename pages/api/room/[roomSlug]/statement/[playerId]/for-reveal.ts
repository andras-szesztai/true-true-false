import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { RoundStage } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.playerId &&
        query.playerId === 'string'
    ) {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: query.roomSlug,
                },
                select: {
                    roundStage: true,
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else if (room.roundStage !== RoundStage.QUESTIONING) {
                res.status(401).json({
                    error: 'Sorry, Room Stage is Incorrect',
                })
            } else {
                const statements = await prisma.statement.findMany({
                    where: {
                        playerId: +query.playerId,
                    },
                    select: {
                        id: true,
                        isTrue: true,
                    },
                })
                if (!statements) {
                    res.status(404).json({
                        error: 'Could Not Find Statements By Provided Player ID',
                    })
                } else {
                    return res.status(200).json(statements)
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
}
