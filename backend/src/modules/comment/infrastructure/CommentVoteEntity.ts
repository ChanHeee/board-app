import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { CommentEntity } from "./CommentEntity"
import { UserEntity } from "../../user/infrastructure/UserEntity"
import { CommentVote } from "../domain/model/CommentVote"

@Entity({ name: "commentVote" })
export class CommentVoteEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  commentId: number

  @Column()
  userId: number

  @Column()
  value: 1 | -1

  @ManyToOne(() => CommentEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "commentId" })
  comment: CommentEntity

  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity

  toDomain(): CommentVote {
    const { id, commentId, userId, value } = this
    return CommentVote.create({ id, commentId, userId, value })
  }
}
