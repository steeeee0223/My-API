// src/server.ts
import app from './app'

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`My API listening at http://localhost:${port}`)
    console.log(`Swagger docs hosting at http://localhost:${port}/docs`)
})
