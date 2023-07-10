import {
  controller,
  httpPost,
  interfaces,
  request,
  requestBody,
  response,
} from "inversify-express-utils"
import { inject } from "inversify"
import { validate } from "../../../../shared/middleware/validationMiddleware"
import { Response } from "express"
import { UserResponse } from "../UserResponse"
import { CreateUserService } from "./CreateUserService"
import Types from "../../../../config/Types"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { CreateUserRequest } from "./CreateUserRequest"

@controller("/api/users")
export class CreateUserController implements interfaces.Controller {
  constructor(
    @inject(Types.CreateUserService) private service: CreateUserService
  ) {}

  @httpPost("/", validate(CreateUserRequest))
  async create(
    @request() req: BodyRequest<CreateUserRequest>,
    @response() res: Response
  ) {
    console.log("===============RESISTER CONTROLLER===============")
    console.log("request from frontend", req.headers)
    console.log("=================================================\n\n")

    const dto = new CreateUserRequest({ ...req.body })
    try {
      const user = await this.service.execute(dto)
      return res.status(200).json({ user })
    } catch (error) {
      throw error
    }
  }
}
