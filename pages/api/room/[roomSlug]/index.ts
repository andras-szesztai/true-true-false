// Get room by slug

import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { GET_ROOM_REQUEST_FIELDS } from 'constants/requests'
import { GENERAL_ERROR } from 'constants/messages'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.roomSlug === 'string') {
        try {
            const room = await prisma.room.findUnique({
                where: {
                    slug: req.query.roomSlug,
                },
                select: GET_ROOM_REQUEST_FIELDS,
            })
            if (!room) {
                return res.status(404).json({
                    error: 'Could Not Find Room By Provided ID',
                })
            }
            return res.status(200).json(room)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({
                    error: GENERAL_ERROR,
                })
            }
        }
    }
    return res.status(400).json({
        error: 'Invalid Room Slug',
    })
}
