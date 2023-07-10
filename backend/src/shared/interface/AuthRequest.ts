import { Request } from "express"
import { User } from "../../modules/user/domain/model/User"

export interface AuthRequest extends Request {
  user: User
}
