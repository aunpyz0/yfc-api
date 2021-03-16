import { PrismaClient } from '@prisma/client';
import { isBefore } from 'date-fns';
import { Request, Response, NextFunction } from 'express'
import { hash, ACCESS_TOKEN } from '../token'

export default function(prisma: PrismaClient) {
    return async function(req: Request, res: Response, next: NextFunction) {
        const tokenStr = req.headers.authorization?.slice('Bearer '.length) || ''
    
        if (tokenStr) {
            const token = await prisma.token.findFirst({
                where: {
                    token: hash(tokenStr),
                },
                include: {
                    Staff: true
                }
            })
            if (token?.type === ACCESS_TOKEN && isBefore(new Date(), new Date(token.expiredAt))) {
                req.user = token.Staff
            }
        }

        next()
    }
}