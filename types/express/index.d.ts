import 'express'
import { Staff } from '@prisma/client'

declare module 'express' {
    interface Request {
        user?: Staff
    }
}