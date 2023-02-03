import { Auth, LoginParams, RegisterParams } from './auth.schema'

export class AuthService {
    public register(params: RegisterParams): Auth {
        return {
            user: { name: 'Jane Doe' },
            token: 'some-token',
        }
    }
    public login(params: LoginParams): Auth {
        return {
            user: { name: 'Jane Doe' },
            token: 'some-token',
        }
    }
}
