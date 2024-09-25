import { NextFunction, Request, Response } from 'express'

export const viewHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('home', { hola: 'Hola Mundo' })
  } catch (error: any) {
    next(error)
  }
}
