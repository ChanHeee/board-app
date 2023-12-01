import { inject } from "inversify"
import {
  controller,
  httpPost,
  interfaces,
  request,
  requestBody,
  response,
} from "inversify-express-utils"

import { NextFunction, Request, Response } from "express"
import Types from "../../../../config/Types"
import { PostRequest } from "../PostRequest"
import { PostResponse } from "../PostResponse"
import { validate } from "../../../../shared/middleware/validationMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import { CreatePostService } from "./CreatePostService"
import { BodyRequest } from "../../../../shared/interface/BodyRequest"
import { CreatePostRequest } from "./CreatePostRequest"

@controller("/api/posts")
export class CreatePostController implements interfaces.Controller {
  constructor(
    @inject(Types.CreatePostService)
    private createPostService: CreatePostService
  ) {}

  @httpPost("/", EnsureAuthenticated, validate(CreatePostRequest))
  async create(
    @request() req: BodyRequest<CreatePostRequest>,
    @response() res: Response
  ) {
    try {
      const dto = new CreatePostRequest({ userId: req.user.id, ...req.body })
      const post = await this.createPostService.execute(dto)
      return res.status(200).json({ post })
    } catch (error) {
      throw error
    }
  }
}
