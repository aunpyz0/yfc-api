import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.post('/banks', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body
            const created = await prisma.bank.create({
                data: { name }
            })
            return res.status(201).json({
                id: created.id,
                name: created.name,
            })
        } catch (e) {
            next(e)
        }
    })

    router.put('/banks/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name } = req.body
            const updated = await prisma.bank.update({
                where: { id },
                data: { name }
            })
            return res.status(200).json({
                id: updated.id,
                name: updated.name,
            })
        } catch (e) {
            next(e)
        }
    })

    router.delete('/banks/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.bank.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/banks', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const banks = await prisma.bank.findMany()
            return res.json(banks)
        } catch (e) {
            next(e)
        }
    })

    router.get('/banks/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const bank = await prisma.bank.findFirst({
                where: { id }
            })
            return res.json(bank)
        } catch (e) {
            next(e)
        }
    })

    return router
}