import { inject } from "inversify"
import {
  controller,
  httpDelete,
  interfaces,
  requestParam,
  response,
} from "inversify-express-utils"
import { Response } from "express"
import { EnsureAuthenticated } from "../../../../shared/middleware/authMiddleware"
import Types from "../../../../config/Types"
import { DeletePostService } from "./DeletePostService"

@controller("/api/posts", EnsureAuthenticated)
export class DeletePostController implements interfaces.Controller {
  constructor(
    @inject(Types.DeletePostService)
    private deletePostService: DeletePostService
  ) {}

  @httpDelete("/:id")
  async delete(@requestParam("id") id: number, @response() res: Response) {
    await this.deletePostService.execute(id)
    return res.status(204).end()
  }
}
