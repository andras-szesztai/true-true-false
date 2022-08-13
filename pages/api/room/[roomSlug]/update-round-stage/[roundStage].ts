import { NextApiRequest, NextApiResponse } from 'next'
import { RoundStage } from '@prisma/client'

import { prisma } from 'utils/prisma'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        if (
            Object.values(RoundStage).includes(
                req.query.roundStage as RoundStage
            )
        ) {
            try {
                const room = await prisma.room.update({
                    where: {
                        slug: req.query.roomSlug,
                    },
                    data: {
                        roundStage: req.query.roundStage as RoundStage,
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
            error: 'Invalid Round Stage Type',
        })
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
