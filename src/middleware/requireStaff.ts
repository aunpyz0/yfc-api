import { NextFunction, Request, Response } from "express"

export default function(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        return next()
    }
    return res.sendStatus(401)
}