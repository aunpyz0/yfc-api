import express, { NextFunction, Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import requireAccountant from '../middleware/requireAccountant'
import setStaff from '../middleware/setStaff'
import prisma from '../prisma'

const saltRounds = 12

export default function(): Router {
    const router = express.Router()

    router.use(setStaff(prisma))

    // router.post('/staffs', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
    //     const { code, firstname, lastname, email, password, roleId } = req.body
    //     try {
    //         const hashed = await bcrypt.hash(password, saltRounds)
    //         await prisma.staff.create({
    //             data: {
    //                 code,
    //                 firstname,
    //                 lastname,
    //                 email,
    //                 password: hashed,
    //                 roleId,
    //             }
    //         })
    //         return res.sendStatus(201)
    //     } catch (e) {
    //         next(e)
    //     }
    // })

    // router.put('/staffs/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
    //     const { id, code, firstname, lastname, email, password, roleId } = req.body
    //     try {
    //         const hashed = await bcrypt.hash(password, saltRounds)
    //         await prisma.staff.update({
    //             where: { id },
    //             data: {
    //                 code,
    //                 firstname,
    //                 lastname,
    //                 email,
    //                 password: hashed,
    //                 roleId,
    //             }
    //         })
    //         return res.sendStatus(200)
    //     } catch (e) {
    //         next(e)
    //     }
    // })

    router.delete('/staffs/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
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

    router.get('/staffs', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const staffs = await prisma.staff.findMany()
            return res.json(staffs)
        } catch (e) {
            next(e)
        }
    })

    router.get('/staffs/:id', requireAccountant, async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10)
        try {
            const staff = await prisma.staff.findFirst({
                where: { id }
            })
            return res.json(staff)
        } catch (e) {
            next(e)
        }
    })

    return router
}