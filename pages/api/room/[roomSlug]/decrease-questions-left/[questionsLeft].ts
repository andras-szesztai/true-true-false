import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        if (typeof req.query.questionsLeft === 'string') {
            try {
                const room = await prisma.room.update({
                    where: {
                        slug: req.query.roomSlug,
                    },
                    data: {
                        questionsLeft: +req.query.questionsLeft - 1,
                    },
                    select: {
                        id: true,
                    },
                })
                if (!room) {
                    return res.status(404).json({
                        error: 'Could Not Find Room By Provided ID',
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
            error: 'Invalid Questions Left Query',
        })
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
