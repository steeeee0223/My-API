// src/server.ts
import app from './app'
import { BACKEND_PORT } from './config'
import { logger } from './utils'

app.listen(BACKEND_PORT, () => {
    logger.level = 'debug'
    logger.info(`My API listening at http://localhost:${BACKEND_PORT}`)
    logger.info(
        `Swagger docs hosting at http://localhost:${BACKEND_PORT}/api/v1/docs`
    )
})
