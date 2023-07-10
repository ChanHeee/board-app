import { Post } from "../../post/domain/model/Post"
import { User } from "../domain/model/User"
import { PostEntity } from "../../post/infrastructure/PostEntity"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm"
import { UserPassword } from "../domain/model/UserPassword"

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(init?: Partial<UserEntity>) {
    Object.assign(this, init)
  }

  static create(props: Partial<UserEntity>) {
    return new UserEntity({ ...props })
  }

  static of(user: User): UserEntity {
    const { password, ...rest } = user
    return new UserEntity({ password: password.value, ...rest })
  }

  toDomain(): User {
    const { password, ...rest } = this
    return new User({
      ...rest,
      password: UserPassword.of(password),
    })
  }
}
