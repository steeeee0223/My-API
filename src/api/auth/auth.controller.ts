import {
    Body,
    Controller,
    Post,
    Route,
    SuccessResponse,
    Response,
    Tags,
} from 'tsoa'

import { ValidateErrorJSON } from '../../schemas'
import { Auth, LoginParams, RegisterParams } from './auth.schema'
import { AuthService } from './auth.service'

@Tags('Authentication')
@Route('auth')
export class AuthController extends Controller {
    /**
     * Registers a new user.
     */
    @SuccessResponse('201', 'Registered')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Post('register')
    public async register(@Body() body: RegisterParams): Promise<Auth> {
        this.setStatus(201)
        return new AuthService().register(body)
    }
    /**
     * Logs in a user.
     */
    @SuccessResponse('201', 'Registered')
    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @Post('login')
    public async login(@Body() body: LoginParams): Promise<Auth> {
        this.setStatus(201)
        return new AuthService().login(body)
    }
}
