import { inject } from "inversify"
import {
  controller,
  httpPut,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils"

import { Response } from "express"

import { PostResponse } from "../PostResponse"
import { PostRequest } from "../PostRequest"
import Types from "../../../../config/Types"
import { UpdatePostService } from "./UpdatePostService"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { validate } from "../../../../shared/middleware/validationMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { UpdatePostRequest } from "./UpdatePostRequest"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"

@controller("/api/posts")
export class UpdatePostController implements interfaces.Controller {
  constructor(
    @inject(Types.UpdatePostService)
    private service: UpdatePostService
  ) {}

  @httpPut("/:id", EnsureAuthenticated, validate(UpdatePostRequest))
  async update(
    @request() req: BodyRequest<UpdatePostRequest>,
    @requestParam("id") id: number,
    @response() res: Response
  ) {
    const dto = UpdatePostRequest.create({
      id,
      userId: req.user.id,
      ...req.body,
    })
    const post = await this.service.execute(dto)
    return res.status(200).json({ post })
  }
}
