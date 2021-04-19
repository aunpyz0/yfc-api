import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.post('/yfcbanks', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, accountNumber, bankId, bankBranch } = req.body
            const created = await prisma.yFCBank.create({
                data: { 
                    name,
                    accountNumber, 
                    bankId, 
                    bankBranch,
                },
                include: {
                    bank: true
                }
            })
            return res.status(201).json({
                id: created.id,
                name: created.name,
                accountNumber: created.accountNumber,
                bank: created.bank,
                bankBranch: created.bankBranch,
            })
        } catch (e) {
            next(e)
        }
    })

    router.put('/yfcbanks/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name, accountNumber, bankId, bankBranch } = req.body
            const updated = await prisma.yFCBank.update({
                where: { id },
                data: { 
                    name,
                    accountNumber,
                    bankId,
                    bankBranch,
                },
                include: {
                    bank: true,
                }
            })
            return res.status(200).json({
                id: updated.id,
                name: updated.name,
                accountNumber: updated.accountNumber,
                bank: updated.bankId,
                bankBranch: updated.bankBranch,
            })
        } catch (e) {
            next(e)
        }
    })

    router.delete('/yfcbanks/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.yFCBank.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/yfcbanks', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const banks = await prisma.yFCBank.findMany({
                include: {
                    bank: true,
                }
            })
            return res.json(banks)
        } catch (e) {
            next(e)
        }
    })

    router.get('/yfcbanks/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const bank = await prisma.yFCBank.findFirst({
                where: { id },
                include: {
                    bank: true,
                }
            })
            return res.json(bank)
        } catch (e) {
            next(e)
        }
    })

    return router
}