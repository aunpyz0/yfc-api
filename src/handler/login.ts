import { PrismaClient } from '@prisma/client'
import { Router, NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { token, hash, ACCESS_TOKEN, REFRESH_TOKEN } from '../token'
import { addMinutes } from 'date-fns'

export default function(prisma: PrismaClient): Router {
    const REFRESH_TOKEN_AGE = Number(process.env.REFRESH_TOKEN_AGE)
    const ACCESS_TOKEN_AGE = Number(process.env.ACCESS_TOKEN_AGE)
    const router = Router()

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body
            const staff = await prisma.staff.findFirst({
                where: {
                    email: email,   
                }
            })
            if (staff) {
                const valid = await bcrypt.compare(password, staff.password)
                if (!valid) {
                    return res.status(401).json({
                        message: "Username or Password incorrect"
                    })
                }

                const refreshToken = token()
                const accessToken = token()
                const hashedRefreshToken = hash(refreshToken)
                const hashedAccessToken = hash(accessToken)
                
                const now = new Date()
                const refreshTokenExpires = addMinutes(now, REFRESH_TOKEN_AGE)
                const accessTokenExpires = addMinutes(now, ACCESS_TOKEN_AGE)

                await prisma.token.deleteMany({
                    where: {
                        staffId: staff.id
                    }
                })

                await Promise.all([
                    prisma.token.create({
                        data: {
                            token: hashedRefreshToken,
                            type: REFRESH_TOKEN,
                            expiredAt: refreshTokenExpires,
                            staffId: staff.id,
                        }
                    }),
                    prisma.token.create({
                        data: {
                            token: hashedAccessToken,
                            type: ACCESS_TOKEN,
                            expiredAt: accessTokenExpires,
                            staffId: staff.id,
                        }
                    })
                ])

                return res.status(200).send({
                    firstname: staff.firstname,
                    lastname: staff.lastname,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                })
            } else {
                return res.status(401).json({
                    message: "Username or Password incorrect"
                })
            }
        } catch(e) {
            next(e)
        }
    })

    return router
}
