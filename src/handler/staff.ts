import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const saltRounds = 12

export default function(prisma: PrismaClient) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        const { code, firstname, lastname, email, password, roleId } = req.body
        try {
            const hashed = await bcrypt.hash(password, saltRounds)
            await prisma.staff.create({
                data: {
                    code,
                    firstname,
                    lastname,
                    email,
                    password: hashed,
                    roleId,
                }
            })
            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    })

    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const { id, code, firstname, lastname, email, password, roleId } = req.body
        try {
            const hashed = await bcrypt.hash(password, saltRounds)
            await prisma.staff.update({
                where: { id },
                data: {
                    code,
                    firstname,
                    lastname,
                    email,
                    password: hashed,
                    roleId,
                }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        try {
            await prisma.staff.delete({
                where: { id }
            })
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const staffs = await prisma.staff.findMany({
                include: {
                    role: true,
                }
            })
            return res.json(staffs)
        } catch (e) {
            next(e)
        }
    })

    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        try {
            const staff = await prisma.staff.findFirst({
                where: { id },
                include: {
                    role: true,
                }
            })
            return res.json(staff)
        } catch (e) {
            next(e)
        }
    })

    return router
}