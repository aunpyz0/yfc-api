import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express'
import { verifyToken, ACCESS_TOKEN } from '../token'

export default function(prisma: PrismaClient) {
    
    const TOKEN_KEY = process.env.TOKEN_KEY || ''

    return async function(req: Request, res: Response, next: NextFunction) {
        const tokenStr = req.headers.authorization?.slice('Bearer '.length) || ''
        if (!tokenStr) {
            return next()
        }

        try {
            const data = verifyToken(tokenStr)
            if (data.type !== ACCESS_TOKEN) {
                return res.sendStatus(401)
            }
            const staff = await prisma.staff.findUnique({
                where: {
                    id: data.id,
                }
            })
            req.user = staff!
            next()

        } catch (err) {
            next()
        }   
    }
}