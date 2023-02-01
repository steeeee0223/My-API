// src/app.ts
import express, {
    json,
    urlencoded,
    Response,
    Request,
    Application,
} from 'express'
import swaggerUi from 'swagger-ui-express'

import { RegisterRoutes } from '../build/routes'
import { errorHandler, notFoundHandler } from './middlewares'

class App {
    public express!: Application

    constructor() {
        this.express = express()
        this._middlewares()
        this._swagger()
        this._routes()
        this._errors()
    }

    private _middlewares() {
        this.express.use(
            urlencoded({
                extended: true,
            })
        )
        this.express.use(json())
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
        RegisterRoutes(this.express)
    }

    private _errors() {
        this.express.use(notFoundHandler)
        this.express.use(errorHandler)
    }
}

export default new App().express
