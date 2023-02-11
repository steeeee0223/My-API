import { BadRequestError, UnauthenticatedError } from '../../schemas'
import { UserModel as User } from './auth.model'
import { Auth, LoginParams, RegisterParams } from './auth.schema'

export class AuthService {
    public async register(params: RegisterParams): Promise<Auth> {
        const user = await User.create({ ...params })
        const token = user.createJWT()
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
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const isPasswordCorrect = await user.verifyPassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const token = user.createJWT()

        return {
            user: { name: user.getName() },
            token,
        }
    }
}
