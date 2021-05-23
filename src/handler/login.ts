import { PrismaClient } from '@prisma/client'
import { Router, NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../token'

export default function(prisma: PrismaClient): Router {
    const router = Router()

    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            const staff = await prisma.staff.findUnique({
                where: {
                    email: email,   
                },
            })
            if (staff) {
                const valid = await bcrypt.compare(password, staff.password)
                if (!valid) {
                    return res.status(401).json({
                        message: "Username or Password incorrect"
                    })
                }

                const refreshToken = generateRefreshToken({ id: staff.id })
                const accessToken = generateAccessToken({ id: staff.id })

                await prisma.staff.update({
                    data: {
                        refreshToken,
                    },
                    where: {
                        id: staff.id
                    }
                })

                return res.status(200).send({
                    firstname: staff.firstname,
                    lastname: staff.lastname,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                    role: staff.role,
                })
            } else {
                return res.status(401).json({
                    message: "Username or Password incorrect"
                })
            }
        } catch(e) {
            return res.status(401).json({
                message: "Username or Password incorrect"
            })
        }
    })

    return router
}
