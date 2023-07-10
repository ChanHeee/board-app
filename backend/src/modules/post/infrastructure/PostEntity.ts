import { Post } from "../domain/model/Post"
import { CategoryEntity } from "../../category/infrastructure/CategoryEntity"
import { UserEntity } from "../../user/infrastructure/UserEntity"

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
  UpdateDateColumn,
} from "typeorm"
import { PostTitle } from "../domain/model/PostTitle"
import { CommentEntity } from "../../comment/infrastructure/CommentEntity"
import { PostVoteEntity } from "./PostVoteEntity"

@Entity({ name: "post" })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  userId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => CategoryEntity, {
    cascade: true,
  })
  @JoinTable({ name: "post_to_category" })
  categories: CategoryEntity[]

  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity

  numComments: number

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[]

  @OneToMany(() => PostVoteEntity, (vote) => vote.post)
  votes: PostVoteEntity[]

  constructor(init?: Partial<PostEntity>) {
    Object.assign(this, init)
  }

  static create(props: Partial<PostEntity>) {
    return new PostEntity({ ...props })
  }

  static of(post: Post): PostEntity {
    const { id, title, content, categories, userId, createdAt, updatedAt } =
      post

    return new PostEntity({
      id,
      title: title.value,
      content,
      categories: categories?.map((category) => CategoryEntity.of(category)),
      userId,
      createdAt,
      updatedAt,
    })
  }

  toDomain(): Post {
    const { title, user, categories, ...rest } = this

    return Post.create({
      ...rest,
      title,
      user: user ? user.toDomain() : null,
      categories: categories?.map((category) => category.toDomain()),
    })
  }
}
