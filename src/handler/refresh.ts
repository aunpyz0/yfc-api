import { Router, NextFunction, Request, Response } from 'express'
import { generateAccessToken } from '../token'
import prisma from '../prisma'

export default function (): Router {
    const router = Router()

    router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenStr = req.body.refreshToken
            if (!tokenStr) {
                return res.sendStatus(401)
            }

            const staff = await prisma.staff.findFirst({
                where: {
                    refreshToken: tokenStr,
                }
            })

            if (!staff) {
                return res.sendStatus(401)
            }

            const accessToken = generateAccessToken({ id: staff.id })
            return res.status(200).json({ accessToken })
            
        } catch (e) {
            next(e)
        }
    })

    return router
}
