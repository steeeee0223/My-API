import { CorsOptions } from 'cors'

export const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:8000',
]

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
}
