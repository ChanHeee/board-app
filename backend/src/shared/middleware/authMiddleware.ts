import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Unauthorized, BadRequest } from "../util/exceptions"
import passport from "passport"
import container from "../../config/ContainerConfig"
import { AuthService } from "../../modules/user/application/AuthService"
import Types from "../../config/Types"
import { UserRepository } from "../../modules/user/domain/repository/UserRepository"
import { inject, injectable } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"

// @injectable()
// export class AuthMiddleware {
//   constructor(
//     @inject(Types.AuthService) private authService: AuthService,
//     @inject(Types.UserRepository) private userRepository: UserRepository
//   ) {}

//   async ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
//     const token = req.headers["authorization"]
//     if (token) {
//       const decoded = await this.authService.decodeJWT(token)
//       const signatureFailed = !!decoded === false

//       if (signatureFailed) {
//         next(new BadRequest("Token signature expired."))
//       }

//       const user = await this.userRepository.findById(decoded.id)
//       req.user = user
//       return next()
//     } else {
//       next(new BadRequest("No access token provided"))
//     }
//   }
// }

@injectable()
export class EnsureAuthenticated extends BaseMiddleware {
  @inject(Types.AuthService) private authService: AuthService
  @inject(Types.UserRepository) private userRepository: UserRepository

  async handler(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]

    if (token) {
      const decoded = await this.authService.decodeJWT(token.split(" ")[1])
      const signatureFailed = !!decoded === false

      if (signatureFailed) {
        return next(new BadRequest("Token signature expired."))
      }

      const user = await this.userRepository.findById(decoded.id)
      req.user = user
      return next()
    } else {
      return next(new BadRequest("No access token provided"))
    }
  }
}

@injectable()
export class IncludeDecodedTokenIfExists extends BaseMiddleware {
  @inject(Types.AuthService) private authService: AuthService
  @inject(Types.UserRepository) private userRepository: UserRepository

  async handler(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]

    if (!token) {
      return next()
    } else {
      const decoded = await this.authService.decodeJWT(token.split(" ")[1])

      const signatureFailed = !!decoded === false

      if (signatureFailed) {
        // throw new BadRequest("test")
        return next()
      }

      const user = await this.userRepository.findById(decoded.id)
      req.user = user
      return next()
    }

    // if (token) {
    //   const decoded = await this.authService.decodeJWT(token.split(" ")[1])
    //   console.log(decoded, "trt")

    //   const signatureFailed = !!decoded === false

    //   if (signatureFailed) {
    //     // throw new BadRequest("test")
    //     return next()
    //   }

    //   const user = await this.userRepository.findById(decoded.id)
    //   req.user = user
    //   return next()
    // } else {
    //   return next()
    // }
  }
}

// const authService = container.get<AuthService>(Types.AuthService)
// const userRepository = container.get<UserRepository>(Types.UserRepository)

export const inNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next(new BadRequest("user already logged in"))
  } else next()
}

// export const ensureAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers["authorization"]
//   if (token) {
//     const decoded = await authService.decodeJWT(token)
//     const signatureFailed = !!decoded === false

//     if (signatureFailed) {
//       throw new BadRequest("Token signature expired.")
//     }

//     const user = await userRepository.findById(decoded.id)
//     req.user = user
//     return next()
//   } else {
//     throw new BadRequest("No access token provided")
//   }
// }

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //? using AuthService with DI Container
  //? but, AuthService logic is used only in this middleware... => doesn't need to separate?
  // const authService = container.get<AuthService>(Types.AuthService)
  // try {
  //   const decoded: any = await authService.extractFromHeader(req)
  //   const { id, username, ...rest } = decoded
  //   req.user = { id, username }
  //   next()
  // } catch (error) {
  //   next(error)
  // }
  //? Without Passport
  // let token = req.headers.authorization || null
  // if (token && token.startsWith("Bearer")) {
  //   try {
  //     token = token.split(" ")[1]
  //     const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
  //     const { id, username, ...rest } = decoded
  //     req.user = { id, username }
  //     next()
  //   } catch (error) {
  //     next(new Unauthorized("Not authorized, token failed"))
  //   }
  // } else {
  //   next(new Unauthorized("Not authorized, no token"))
  // }
  passport.authenticate("jwt", { session: false })(req, res, next)
}
