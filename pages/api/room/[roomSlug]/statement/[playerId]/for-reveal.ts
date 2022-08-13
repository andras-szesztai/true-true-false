import { NextApiRequest, NextApiResponse } from 'next'
import { RoundStage } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        if (typeof req.query.playerId === 'string') {
            try {
                const room = await prisma.room.findUnique({
                    where: {
                        slug: req.query.roomSlug,
                    },
                    select: {
                        roundStage: true,
                        id: true,
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided ID',
                    })
                }
                if (
                    room.roundStage === RoundStage.QUESTION ||
                    room.roundStage === RoundStage.IDLE
                ) {
                    return res.status(401).json({
                        error: 'Room Stage is Incorrect',
                    })
                }
                const falseStatement = await prisma.statement.findMany({
                    where: {
                        playerId: +req.query.playerId,
                        isTrue: false,
                    },
                    select: {
                        id: true,
                    },
                })
                if (!falseStatement) {
                    return res.status(404).json({
                        error: 'Could Not Find Statements By Provided Player ID',
                    })
                }
                const guesses = await prisma.player.findMany({
                    where: {
                        roomId: room.id,
                    },
                    select: {
                        id: true,
                        selectedAnswerId: true,
                    },
                })
                if (!guesses) {
                    return res.status(404).json({
                        error: 'Could Not Find Guesses By Provided Room ID',
                    })
                }
                return res
                    .status(200)
                    .json({ falseStatement: falseStatement[0], guesses })
            } catch (err) {
                if (err instanceof Error) {
                    return res.status(500).json({
                        error: GENERAL_ERROR,
                    })
                }
            }
        }
        return res.status(400).json({
            error: 'Invalid Player Id',
        })
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
