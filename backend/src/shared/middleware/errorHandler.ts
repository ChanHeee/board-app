import { NextFunction, Request, Response } from "express"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack)
  res.status(400).json({ code: 400, success: false, message: err.message })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  // const error = new Error(`Not Found - ${req.originalUrl}`)
  // next(error)
  const error = Error(`Requested path ${req.path} not found`)
  next(error)
}
