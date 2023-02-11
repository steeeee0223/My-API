import { Types } from 'mongoose'

export type UserInfo = {
    userId: string | Types.ObjectId
    name: string
}
