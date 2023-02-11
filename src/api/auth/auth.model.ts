import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { RegisterParams } from './auth.schema'
import { UserInfo } from '../../schemas'

interface IUser extends RegisterParams {}

interface IUserMethods {
    getName(): string
    createJWT(): string
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
})

UserSchema.pre('save', async function (next) {
    const salt: string = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.method('createJWT', function createJWT() {
    const payload: UserInfo = {
        userId: this._id.toString(),
        name: this.name,
    }
    const secret: any = process.env.JWT_SECRET
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_LIFETIME })
})

UserSchema.method(
    'verifyPassword',
    async function verifyPassword(password: string) {
        const isMatch: boolean = await bcrypt.compare(password, this.password)
        return isMatch
    }
)

UserSchema.method('getName', function getName() {
    return this.name
})

export const UserModel = model<IUser, IUserModel>('User', UserSchema)
