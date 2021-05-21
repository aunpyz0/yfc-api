import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.get('/banks', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const banks = await prisma.bank.findMany()
            return res.json(banks)
        } catch (e) {
            next(e)
        }
    })

    return router
}