import express, { Router } from 'express'
import { listHome, submitInvitation } from './controller'

const home: Router = express.Router()

home.get('/', listHome)
home.post('/submit-invitation', submitInvitation)

export default home
