import { User } from "../domain/model/User"

export class UserResponse {
  id: number
  email: string
  username: string

  static of(user: User) {
    const { id, email, username, createdAt, updatedAt } = user
    return {
      id,
      email,
      username,
      createdAt,
      updatedAt,
    }
  }
}
