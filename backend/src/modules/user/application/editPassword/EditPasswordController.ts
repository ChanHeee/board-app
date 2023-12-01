import {
  controller,
  httpDelete,
  httpPatch,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"
import { inject } from "inversify"
import Types from "../../../../config/Types"
import { Response } from "express"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { BadRequest } from "../../../../shared/util/exceptions"
import { EditPasswordService } from "./EditPasswordService"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { EditPasswordRequest } from "./EditPasswordRequest"
import { validate } from "../../../../shared/middleware/validationMiddleware"

@controller("/api/users")
export class EditPasswordController implements interfaces.Controller {
  constructor(
    @inject(Types.EditPasswordService) private service: EditPasswordService
  ) {}

  @httpPatch("/password", EnsureAuthenticated, validate(EditPasswordRequest))
  async excute(
    @request() req: BodyRequest<EditPasswordRequest>,
    @response() res: Response
  ) {
    const dto = new EditPasswordRequest({ id: req.user.id, ...req.body })
    const result = await this.service.execute(dto)
    if (result) {
      return res.status(200).end()
    } else {
      throw new BadRequest()
    }
  }
}
