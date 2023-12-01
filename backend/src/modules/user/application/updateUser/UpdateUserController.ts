import {
  controller,
  interfaces,
  request,
  httpPut,
  response,
} from "inversify-express-utils"
import { inject } from "inversify"
import Types from "../../../../config/Types"

import { Response } from "express"
import { UpdateUserService } from "./UpdateUserService"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { UpdateUserRequest } from "./UpdateUserRequest"
import { validate } from "../../../../shared/middleware/validationMiddleware"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"

@controller("/api/users")
export class UpdateUserController implements interfaces.Controller {
  constructor(
    @inject(Types.UpdateUserService) private service: UpdateUserService
  ) {}

  @httpPut("/", EnsureAuthenticated, validate(UpdateUserRequest))
  async excute(
    @request() req: BodyRequest<UpdateUserRequest>,
    @response() res: Response
  ) {
    const dto = UpdateUserRequest.create({
      id: req.user.id,
      ...req.body,
    })
    const user = await this.service.execute(dto)
    return res.status(200).json({ user })
  }
}
