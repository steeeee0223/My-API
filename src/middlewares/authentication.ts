import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config'
import { UnauthenticatedError, UserInfo } from '../schemas'

export async function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    try {
        const header = req.headers.authorization
        if (!header || !header.startsWith('Bearer')) {
            throw new UnauthenticatedError('Authentication invalid!')
        }
        const [, token] = header.split(' ')
        const secret: any = JWT_SECRET
        const payload = jwt.verify(token, secret)
        req.user = payload as UserInfo
        next()
    } catch (error) {
        next(error)
    }
}
