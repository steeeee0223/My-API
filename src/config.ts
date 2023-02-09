import dotenv from 'dotenv'

import { ConnectOptions } from './db/connect.types'

const conf = dotenv.config()
let DB_CONFIG = {} as ConnectOptions

if (conf.parsed) {
    const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB } =
        conf.parsed
    DB_CONFIG = {
        user: MONGO_USER,
        pass: MONGO_PASS,
        host: MONGO_HOST,
        port: MONGO_PORT,
        db: MONGO_DB,
    }
}
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_LIFETIME = process.env.JWT_LIFETIME
export const BACKEND_PORT = process.env.BACKEND_PORT
export default DB_CONFIG
