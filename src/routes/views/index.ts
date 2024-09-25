import express, { Router } from 'express'
import home from './home'

const view: Router = express.Router()

view.use('/', home)

export default view
