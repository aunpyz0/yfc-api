import { PrismaClient, Role } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.get('/roles', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json([
                Role.STAFF, Role.ACCOUNTANT
            ])
        } catch (e) {
            next(e)
        }
    })

    return router
}