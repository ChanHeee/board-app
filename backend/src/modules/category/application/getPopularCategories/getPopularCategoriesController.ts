import { inject } from "inversify"
import {
  controller,
  httpGet,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils"

import { Request, Response } from "express"

import Types from "../../../../config/Types"
import { GetPopularCategoriesService } from "./getPopularCategoriesService"

@controller("/api/categories/popular")
export class GetPopularCategoriesController implements interfaces.Controller {
  constructor(
    @inject(Types.GetPopularCategoriesService)
    private service: GetPopularCategoriesService
  ) {}

  @httpGet("/")
  async get(@request() req: Request, @response() res: Response) {
    const categories = await this.service.excute()
    return res.status(200).json({ categories })
  }
}
