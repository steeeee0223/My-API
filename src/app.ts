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

import { RegisterRoutes } from '../build/routes'
import { errorHandler, notFoundHandler } from './middlewares'
import { connectDB } from './db'
import DB_CONFIG from './config'

class App {
    public express!: Application

    constructor() {
        this.express = express()
        this._middlewares()
        this._swagger()
        this._routes()
        this._errors()
        this._get_db()
    }

    private _middlewares() {
        this.express.use(
            urlencoded({
                extended: true,
            })
        )
        this.express.use(json())
        this.express.use(cors())
    }

    private _swagger() {
        this.express.use(
            '/docs',
            swaggerUi.serve,
            async (_req: Request, res: Response) => {
                return res.send(
                    swaggerUi.generateHTML(
                        await import('../build/swagger.json')
                    )
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
