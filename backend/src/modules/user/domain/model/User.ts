import { hashSync, compareSync } from "bcrypt"
import { UserPassword } from "./UserPassword"

interface createProps {
  id?: number
  email?: string
  username?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  id: number
  email: string
  username: string
  password: UserPassword
  createdAt: Date
  updatedAt: Date

  constructor(props?: Partial<User>) {
    Object.assign(this, props)
  }

  static create(props: createProps) {
    const { password, ...rest } = props
    return new User({
      ...rest,
      password: password ? UserPassword.create(password) : UserPassword.of(""),
    })
  }

  editPassword(password: string) {
    this.password = UserPassword.create(password)
  }

  comparePassword(inputPassword: string) {
    return compareSync(inputPassword, this.password.value)
  }
}
