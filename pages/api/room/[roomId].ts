// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from 'utils/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    if (method === 'POST') {
        try {
            // const room = await prisma.room.create({
            //     data: {
            //         slug: query.roomId,
            //     },
            // })
            res.status(200).json({ data: 'Creating a room' })
        } catch (err) {
            res.status(401).json({ error: 'Room already exists!' })
        }
        return
    }
    if (method === 'GET') {
        //
    }
    if (method === 'DELETE') {
        //
    }
    // console.log(req.method)
    // console.log({ roomId })
    // res.status(200).send({ roomId })
}
