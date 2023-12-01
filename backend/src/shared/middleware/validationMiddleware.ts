import { NextFunction, Request, Response } from "express"
import { Conflict } from "../util/exceptions"
import { validateSync } from "class-validator"
import { injectable, inject } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"
import { plainToInstance } from "class-transformer"
import { CreateUserRequest } from "../../modules/user/application/createUser/CreateUserRequest"

export const validate =
  <T extends object>(classInstance: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(classInstance, req.body)

    const errors = validateSync(input)

    if (errors.length > 0) {
      next(
        new Conflict(
          `[${errors[0].property}]: ${Object.values(errors[0].constraints)[0]}`
        )
      )
    } else {
      next()
    }
  }
