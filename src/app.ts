import boom from 'boom'
import cors from 'cors'
import express, { Application, json, urlencoded } from 'express'
import fs from 'fs'
import { join } from 'path'
import helmet from 'helmet'
import morgan from 'morgan'

import EnvManager from './config/EnvManager'
import errorHandler from './middlewares/errorHandler'
import v1 from './routes/v1'
import views from './routes/views'

// App
const app: Application = express()
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const port = EnvManager.getPort(3000)

// Settings
app.disable('x-powered-by')
app.set('pkg', pkg)
app.set('port', port)

// Middlewares
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))

// Static files
app.use('/static', express.static(join(__dirname, 'public')))

// View engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

// Security
const whitelist: string[] = ['http://localhost:3000', 'http://localhost:4000']
const options: cors.CorsOptions = {
  exposedHeaders: 'Authorization, Content-Disposition',
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (whitelist.includes(origin as string) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  },
}
app.use(cors(options))

// Redirect
app.get('/info', (req, res) => {
  res.json({
    message: 'Welcome to my API',
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    description: app.get('pkg').description,
    repository: app.get('pkg').repository.url,
    license: app.get('pkg').license,
    author: app.get('pkg').author,
    homepage: app.get('pkg').homepage,
    environment: process.env.NODE_ENV,
  })
})

// API-REST V1
app.use('/v1', v1)
app.use('/', views)

// Verify router
app.use((req, res) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound('Página no encontrada')

  res.status(statusCode).json(payload)
})

// Error handlers
app.use(errorHandler)

export default app
