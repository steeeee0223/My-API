import mongoose from 'mongoose'

import { ConnectOptions } from './connect.types'
import { logger } from '../utils'

mongoose.set('strictQuery', false)

export const connectDB = async ({
    user,
    pass,
    host,
    port,
    db,
}: ConnectOptions) => {
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${user}:${pass}@cluster0.ibu1l1d.mongodb.net/?retryWrites=true&w=majority`
            // `mongodb://${host}:${port}/${db}`,
            // {
            //     authSource: 'admin',
            //     user: user,
            //     pass: pass,
            // }
        )
        logger.info('Connected to mongodb...')
        return connection
    } catch (error) {
        logger.error(error)
    }
}
