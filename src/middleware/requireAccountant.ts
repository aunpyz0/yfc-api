import { Role } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

export default function(req: Request, res: Response, next: NextFunction) {
    if (req.user && req.user.role === Role.ACCOUNTANT) {
        return next()
    }
    return res.sendStatus(401)
}