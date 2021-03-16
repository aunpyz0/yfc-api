import { PrismaClient } from '@prisma/client'
import { Router, NextFunction, Request, Response } from 'express'
import requireAccountant from '../middleware/requireAccountant'
import requireStaff from '../middleware/requireStaff'

export default function(prisma: PrismaClient): Router {
    const router = Router()

    router.post('/', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body
        try {
            const created = await prisma.giveType.create({
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

    router.put('/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const { name } = req.body
            const updated = await prisma.giveType.update({
                where: { id },
                data: { name }
            })
            return res.status(200).json({
                id: id,
                name: updated.name,
            })
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            await prisma.giveType.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const giveTypes = await prisma.giveType.findMany()
            return res.json(giveTypes)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', requireStaff, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10)
            const giveType = await prisma.giveType.findFirst({
                where: { id }
            })
            return res.json(giveType)
        } catch (e) {
            next(e)
        }
    })

    return router
}