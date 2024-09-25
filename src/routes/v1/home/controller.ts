import { NextFunction, Request, Response } from 'express'

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

    res.send(`Gracias por confirmar, ${name}.`)
  } catch (error: any) {
    next(error)
  }
}
