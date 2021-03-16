import { PrismaClient } from '@prisma/client'
import { addMinutes, isBefore } from 'date-fns'
import { Router, NextFunction, Request, Response } from 'express'
import { token as genToken, hash, REFRESH_TOKEN, ACCESS_TOKEN } from '../token'

export default function(prisma: PrismaClient): Router {
    const router = Router()
    const ACCESS_TOKEN_AGE = Number(process.env.ACCESS_TOKEN_AGE)
    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenStr = req.headers.authorization?.slice('Bearer '.length) || ''
            if (tokenStr) {
                const token = await prisma.token.findFirst({
                    where: {
                        token: hash(tokenStr),
                    },
                    include: {
                        Staff: true
                    }
                })

                if (token?.type === REFRESH_TOKEN && isBefore(new Date(), new Date(token.expiredAt))) {
                    const accessToken = await prisma.token.findFirst({
                        where: {
                            type: ACCESS_TOKEN,
                            staffId: token.staffId,
                        }
                    })

                    const newAccessToken = genToken()
                    const accessTokenExpires = addMinutes(new Date(), ACCESS_TOKEN_AGE)
                    await prisma.token.update({
                        data: {
                            token: hash(newAccessToken),
                            expiredAt: accessTokenExpires,
                        },
                        where: {
                            id: accessToken!.id
                        }
                    })

                    return res.status(200).json({
                        accessToken: newAccessToken,
                    })   
                }
            }
            
            return res.sendStatus(401)
        } catch(e) {
            next(e)
        }
    })
    return router
}
