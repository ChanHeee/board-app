import { User } from "../model/User"
export interface UserRepository {
  save(user: User): Promise<User>
  findById(id: number): Promise<User>
  findByEmail(email: string): Promise<User>
  findByUserName(username: string): Promise<User>
  delete(id: number): Promise<Boolean>
  update(id: number, partial: Partial<User>): Promise<Boolean>
}
