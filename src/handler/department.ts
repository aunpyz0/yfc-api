import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'
import setStaff from '../middleware/setStaff'

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.use(setStaff(prisma))

    router.post('/departments', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.body
            const created = await prisma.department.create({
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

    router.put('/departments/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name } = req.body
            const updated = await prisma.department.update({
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

    router.delete('/departments/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.department.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/departments', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departments = await prisma.department.findMany()
            return res.json(departments)
        } catch (e) {
            next(e)
        }
    })

    router.get('/departments/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const department = await prisma.department.findFirst({
                where: { id }
            })
            return res.json(department)
        } catch (e) {
            next(e)
        }
    })

    return router
}