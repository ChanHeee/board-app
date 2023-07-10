import { UserEntity } from "../../user/infrastructure/UserEntity"
import { PostEntity } from "../../post/infrastructure/PostEntity"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from "typeorm"
import { Comment } from "../domain/model/Comment"

@Entity({ name: "comment" })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  userId: number

  @Column()
  parentPostId: number

  @Column({ nullable: true })
  parentCommentId: number

  numChildComments: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => PostEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "parentPostId" })
  post: PostEntity

  @ManyToOne(() => CommentEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "parentCommentId" })
  comment: CommentEntity

  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity

  constructor(init?: Partial<CommentEntity>) {
    Object.assign(this, init)
  }

  static of(comment: Comment): CommentEntity {
    const { user, ...rest } = comment
    return new CommentEntity({
      ...rest,
      user: user ? UserEntity.of(user) : null,
    })
  }

  toDomain() {
    const { user, ...rest } = this
    return Comment.create({
      ...rest,
      user: user ? user.toDomain() : null,
    })
  }
}
