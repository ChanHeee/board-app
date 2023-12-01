import {
  controller,
  httpDelete,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils"
import { inject } from "inversify"
import Types from "../../../../config/Types"

import { Response } from "express"
import { DeleteUserService } from "./DeleteUserService"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"

@controller("/api/users")
export class DeleteUserController implements interfaces.Controller {
  constructor(
    @inject(Types.DeleteUserService) private service: DeleteUserService
  ) {}

  @httpDelete("/", EnsureAuthenticated)
  async excute(@request() req: AuthRequest, @response() res: Response) {
    const result = await this.service.execute(req.user.id)
    if (result) {
      return res.status(204).end()
    } else {
      return res.status(400).end()
    }
  }
}
