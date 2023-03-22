import { Request } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../config'
import { BadRequestError, UnauthenticatedError, UserInfo } from '../../schemas'
import { logger } from '../../utils'
import { UserModel as User } from './auth.model'
import { Auth, LoginParams, RegisterParams } from './auth.schema'

export class HAuthService {
    private _getToken(req: Request): string {
        const header = req.headers.authorization
        if (!header || !header.startsWith('Bearer')) {
            throw new UnauthenticatedError('Authentication invalid!')
        }
        const [, token] = header.split(' ')
        return token
    }

    public async register(params: RegisterParams): Promise<Auth> {
        const user = await User.create({ ...params })
        const token = await user.createJWT()
        return {
            user: { name: user.getName() },
            token,
        }
    }

    public async login(params: LoginParams): Promise<Auth> {
        const { email, password } = params
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findOne({ email })
        if (!user) {
            logger.debug('[LOGIN] user not found')
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const isPasswordCorrect = user.verifyPassword(password)
        if (!isPasswordCorrect) {
            logger.debug('[LOGIN] password incorrect')
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const token = await user.createJWT()
        return {
            user: { name: user.getName() },
            token,
        }
    }

    public async refresh(req: Request): Promise<Auth> {
        const accessToken = this._getToken(req)
        const user = await User.findOne({ accessToken })
        if (!user) {
            logger.debug('[REFRESH] user not found')
            throw new UnauthenticatedError('Forbidden!')
        }

        const secret = JWT_SECRET ?? ('' as never)
        const decoded = (await jwt.verify(accessToken, secret)) as UserInfo
        if (!decoded || user.name !== decoded.name) {
            logger.debug('[REFRESH] Decode jwt payload error')
            throw new UnauthenticatedError('Forbidden!')
        }
        const token = await user.createJWT()
        return {
            user: { name: user.getName() },
            token,
        }
    }

    public async logout(req: Request): Promise<void> {
        const accessToken = this._getToken(req)

        // refresh token in db?
        const user = await User.findOne({ accessToken })
        if (!user) {
            logger.debug('[LOGOUT] no user found')
        }

        // delete accessToken in db
        user?.removeToken()
    }
}
