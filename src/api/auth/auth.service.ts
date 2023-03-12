import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { TsoaResponse } from 'tsoa'

import { JWT_SECRET } from '../../config'
import { BadRequestError, UnauthenticatedError, UserInfo } from '../../schemas'
import { logger } from '../../utils'
import { UserModel as User } from './auth.model'
import { Auth, LoginParams, RegisterParams } from './auth.schema'

const setCookie = (token: string) => {
    return {
        'Set-Cookie': `jwt=${token}; HttpOnly;`,
    }
}

export class AuthService {
    public async register(
        params: RegisterParams,
        res: TsoaResponse<201, Auth>
    ): Promise<Auth> {
        const user = await User.create({ ...params })
        const token = await user.createJWT()
        return res(
            201,
            {
                user: { name: user.getName() },
                token,
            },
            setCookie(token)
        )
    }

    public async login(
        params: LoginParams,
        res: TsoaResponse<200, Auth>
    ): Promise<Auth> {
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
        return res(
            200,
            {
                user: { name: user.getName() },
                token,
            },
            setCookie(token)
        )
    }

    public async refresh(
        req: Request,
        res: TsoaResponse<200, Auth>
    ): Promise<Auth> {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            logger.debug('[REFRESH] cookies not found')
            throw new UnauthenticatedError('Forbidden!')
        }

        const accessToken = cookies.jwt
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
        return res(
            200,
            {
                user: { name: user.getName() },
                token,
            },
            setCookie(token)
        )
    }

    public async logout(
        req: Request,
        res: TsoaResponse<204, void>
    ): Promise<void> {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            logger.debug('[LOGOUT] no cookies found')
            return res(204)
        }

        // refresh token in db?
        const accessToken = cookies.jwt
        const user = await User.findOne({ accessToken })
        if (!user) {
            logger.debug('[LOGOUT] no user found')
            return res(204)
        }

        // delete accessToken in db
        user.removeToken()
        return res(204)
    }
}
