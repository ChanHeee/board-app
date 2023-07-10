import { injectable } from "inversify"
import jwt from "jsonwebtoken"

@injectable()
export class AuthService {
  private tokenExpiryTime = "30m"

  signJWT(props: any): string {
    return jwt.sign(props, process.env.JWT_SECRET, {
      expiresIn: this.tokenExpiryTime,
    })
  }

  decodeJWT(token: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err.name)

          return resolve(null)
        }
        return resolve(decoded)
      })
    })
  }
}
