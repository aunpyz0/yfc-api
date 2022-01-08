import { Role } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'
import prisma from '../prisma'

export default function() {
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