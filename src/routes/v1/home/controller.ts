import { NextFunction, Request, Response } from 'express'
import { join } from 'path'
import fs from 'fs'

export const listHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ hola: 'mundo' })
  } catch (error: any) {
    next(error)
  }
}

export const submitInvitation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, withPartner } = req.body

    console.log(`Nombre: ${name}`)
    console.log(`Asistirá con pareja: ${withPartner ? 'Sí' : 'No'}`)
    const confirmationLine = `Name: ${name}, With Partner: ${withPartner ? 'Sí' : 'No'}\n`

    const filePath = join(__dirname, '../../../public/lista.txt')

    fs.appendFile(filePath, confirmationLine, err => {
      console.log('saved', err)
    })

    res.send(`Gracias por confirmar, ${name}.`)
  } catch (error: any) {
    next(error)
  }
}
