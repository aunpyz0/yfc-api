import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express'
import { hash, ACCESS_TOKEN } from '../token'

export default function(prisma: PrismaClient) {
    return async function(req: Request, res: Response, next: NextFunction) {
        const tokenStr = req.headers.authorization?.slice('Bearer '.length) || ''
    
        if (tokenStr) {
            const token = await prisma.token.findFirst({
                where: {
                    token: hash(tokenStr),
                    type: ACCESS_TOKEN,
                },
                include: {
                    Staff: true
                }
            })
            if (token) {
                req.user = token.Staff
            }
        }

        next()
    }
}