import { NextApiRequest, NextApiResponse } from 'next'
import { shuffle } from 'lodash'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD } from 'constants/requests'

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
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided ID',
                    })
                }
                const statements = await prisma.statement.findMany({
                    where: {
                        playerId: +req.query.playerId,
                    },
                    select: GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD,
                })
                if (!statements) {
                    return res.status(404).json({
                        error: 'Could Not Find Statements By Provided Player ID',
                    })
                }
                return res.status(200).json(shuffle(statements))
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
