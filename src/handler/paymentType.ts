import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.post('/paymenttypes', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body
            await prisma.paymentType.create({
                data: { name }
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/paymenttypes/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name } = req.body
            await prisma.paymentType.update({
                where: { id },
                data: { name }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/paymenttypes/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.paymentType.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/paymenttypes', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const banks = await prisma.paymentType.findMany()
            return res.json(banks)
        } catch (e) {
            next(e)
        }
    })

    router.get('/paymenttypes/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const bank = await prisma.paymentType.findFirst({
                where: { id }
            })
            return res.json(bank)
        } catch (e) {
            next(e)
        }
    })

    return router
}