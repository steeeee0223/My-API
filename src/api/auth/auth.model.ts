import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { RegisterParams } from './auth.schema'
import { UserInfo } from '../../schemas'
import { JWT_LIFETIME, JWT_SECRET } from '../../config'

interface IUser extends RegisterParams {
    accessToken: string
}

interface IUserMethods {
    getName(): string
    createJWT(): string
    removeToken(): void
    verifyPassword(password: string): boolean
}

type IUserModel = Model<IUser, {}, IUserMethods>

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    accessToken: {
        type: String,
    },
})

UserSchema.pre('save', async function (next) {
    const salt: string = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.method('createJWT', async function createJWT() {
    const payload: UserInfo = {
        userId: this._id.toString(),
        name: this.name,
    }
    const secret: any = JWT_SECRET
    const token = jwt.sign(payload, secret, { expiresIn: JWT_LIFETIME })
    this.accessToken = token
    this.save()
    return token
})

UserSchema.method(
    'verifyPassword',
    async function verifyPassword(password: string) {
        const isMatch: boolean = await bcrypt.compare(password, this.password)
        return isMatch
    }
)

UserSchema.method('removeToken', async function () {
    this.accessToken = ''
    this.save()
})

UserSchema.method('getName', function getName() {
    return this.name
})

export const UserModel = model<IUser, IUserModel>('User', UserSchema)
