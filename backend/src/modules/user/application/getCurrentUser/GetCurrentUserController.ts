import { inject } from "inversify"
import {
  controller,
  httpGet,
  interfaces,
  next,
  request,
  response,
} from "inversify-express-utils"
import { NextFunction, Response } from "express"
import { UserResponse } from "../UserResponse"
import {
  EnsureAuthenticated,
  IncludeDecodedTokenIfExists,
} from "../../../../shared/middleware/authMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import Types from "../../../../config/Types"

import express from "express"

@controller("/api/users")
export class GetCurrentUserController implements interfaces.Controller {
  // constructor(
  //   @inject(Types.AuthMiddleware) private authMiddleware: AuthMiddleware
  // ) {}
  // @httpGet("/current", protect)
  // async execute(@request() req: AuthRequest, @response() res: Response) {
  //   return res.status(200).json({ user: UserResponse.of(req.user) })
  // }
  @httpGet("/current", IncludeDecodedTokenIfExists)
  async execute(
    @request() req: AuthRequest,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    if (req.user) {
      return res.status(200).json({ user: UserResponse.of(req.user) })
    }
  }
}
