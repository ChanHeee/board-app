import { inject } from "inversify"
import {
  controller,
  httpPost,
  interfaces,
  next,
  request,
  response,
} from "inversify-express-utils"
import Types from "../../../../config/Types"
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { inNotLoggedIn } from "../../../../shared/middleware/authMiddleware"
import { AuthRequest } from "../../../../shared/interface/AuthRequest"
import { UserRepository } from "../../domain/repository/UserRepository"
import { Unauthorized } from "../../../../shared/util/exceptions"

// @controller("/api/users")
// export class LoginController implements interfaces.Controller {
//   @httpPost(
//     "/login",
//     inNotLoggedIn,
//     passport.authenticate("local", { session: false, failWithError: true })
//   )
//   async execute(
//     @request() req: AuthRequest,
//     @response() res: Response,
//     @next() next: NextFunction
//   ) {
//     const { id, username } = req.user
//     const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
//       expiresIn: "10s",
//     })
//     return res.status(200).json({ token })
//   }
// }

@controller("/api/users")
export class LoginController implements interfaces.Controller {
  constructor(
    @inject(Types.UserRepository) private userRepository: UserRepository
  ) {}
  @httpPost("/login")
  async execute(
    @request() req: AuthRequest,
    @response() res: Response,
    @next() next: NextFunction
  ) {
    const { email, password } = req.body
    let user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Unauthorized("Incorrect email.")
    }

    if (!user.comparePassword(password)) {
      throw new Unauthorized("Invalid Password.")
    }
    const { id, username } = user
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    })
    return res.status(200).json({ token })
  }
}
