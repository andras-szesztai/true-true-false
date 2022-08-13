import { NextApiRequest, NextApiResponse } from 'next'
import { shuffle } from 'lodash'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'
import { GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD } from 'constants/requests'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.playerId &&
        typeof query.playerId === 'string'
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
                return res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            }
            const statements = await prisma.statement.findMany({
                where: {
                    playerId: +query.playerId,
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
}
