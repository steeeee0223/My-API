import dotenv from 'dotenv'

import { ConnectOptions } from '../db'

dotenv.config()

export const DB_CONFIG = {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB,
} as ConnectOptions

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_LIFETIME = process.env.JWT_LIFETIME
export const BACKEND_PORT = process.env.BACKEND_PORT || 8000
