import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PostEntity } from "./PostEntity"
import { UserEntity } from "../../user/infrastructure/UserEntity"
import { PostVote } from "../domain/model/PostVote"

@Entity({ name: "postVote" })
export class PostVoteEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  postId: number

  @Column()
  userId: number

  @Column()
  value: 1 | -1

  @ManyToOne(() => PostEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: PostEntity

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity

  toDomain(): PostVote {
    const { id, postId, userId, value } = this
    return PostVote.create({ id, postId, userId, value })
  }
}
