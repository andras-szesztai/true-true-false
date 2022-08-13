import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req
    if (
        query.roomSlug &&
        typeof query.roomSlug === 'string' &&
        query.questionsLeft &&
        typeof query.questionsLeft === 'string'
    ) {
        try {
            const room = await prisma.room.update({
                where: {
                    slug: query.roomSlug,
                },
                data: {
                    questionsLeft: +query.questionsLeft - 1,
                },
                select: {
                    id: true,
                },
            })
            if (!room) {
                res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            } else {
                return res.status(200).json({ success: true })
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
