import { inject } from "inversify"
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  request,
  requestParam,
  response,
} from "inversify-express-utils"
import Types from "../../../../config/Types"
import { Response } from "express"
import { UserResponse } from "../UserResponse"
import { GetUserService } from "./GetUserService"

@controller("/api/users")
export class GetUserController implements interfaces.Controller {
  constructor(@inject(Types.GetUserService) private service: GetUserService) {}

  @httpGet("/:id")
  async execute(@requestParam("id") id: number, @response() res: Response) {
    const user = await this.service.execute(id)
    return res.status(200).json({ user })
  }
}
