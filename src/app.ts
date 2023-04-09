// src/app.ts
import express, {
    json,
    urlencoded,
    Response,
    Request,
    Application,
    Router,
} from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { RegisterRoutes } from '@build/routes'
import { corsOptions, DB_CONFIG } from './config'
import { credentials, errorHandler, notFoundHandler } from './middlewares'
import { connectDB } from './db'

class App {
    public express!: Application

    constructor() {
        this._get_db()
        this.express = express()
        this._middlewares()
        this._routes()
        this._swagger()
        this._errors()
    }

    private _middlewares() {
        this.express.use(credentials)
        this.express.use(cors(corsOptions))
        this.express.use(
            urlencoded({
                extended: true,
            })
        )
        this.express.use(json())
        this.express.use(cookieParser())
    }

    private _swagger() {
        this.express.use(
            '/api/v1/docs',
            swaggerUi.serve,
            async (_req: Request, res: Response) => {
                return res.send(
                    swaggerUi.generateHTML(await import('@build/swagger.json'))
                )
            }
        )
    }

    private _routes() {
        const route_v1 = Router()
        RegisterRoutes(route_v1)
        this.express.use('/api/v1', route_v1)
    }

    private _errors() {
        this.express.use(notFoundHandler)
        this.express.use(errorHandler)
    }

    private async _get_db() {
        await connectDB(DB_CONFIG)
    }
}

export default new App().express
