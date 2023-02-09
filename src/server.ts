// src/server.ts
import app from './app'
import { logger } from './utils'

const port = process.env.BACKEND_PORT || 8000

app.listen(port, () => {
    logger.info(`My API listening at http://localhost:${port}`)
    logger.info(`Swagger docs hosting at http://localhost:${port}/docs`)
})
