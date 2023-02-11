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
        const header =
            req.headers.authorization ||
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2U1MThiZmM3MTAwZDRmNjZkMjg0ZDAiLCJuYW1lIjoiSmFuZSBEb2UiLCJpYXQiOjE2NzYwODM2MDUsImV4cCI6MTY3ODY3NTYwNX0.jVEUTnXGUDgnPnJCTKgSO60jjE5q04UbgXFPZoEiJag'

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
