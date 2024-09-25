import express, { Router } from 'express'
import { viewHome } from './controller'

const home: Router = express.Router()

home.get('/', viewHome)

export default home
