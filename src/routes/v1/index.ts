import express, { Router } from 'express'
import home from './home'

const v1: Router = express.Router()

v1.use('/', home)

export default v1
