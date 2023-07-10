import { injectable, inject } from "inversify"
import { Repository, DataSource, Not, IsNull } from "typeorm"
import { CommentRepository } from "../domain/repository/CommentRepository"
import { CommentEntity } from "./CommentEntity"
import Types from "../../../config/Types"
import { Comment } from "../domain/model/Comment"

@injectable()
export class CommentOrmRepository implements CommentRepository {
  private readonly repository: Repository<CommentEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository(CommentEntity)
  }

  async save(comment: Comment): Promise<Comment> {
    const newComment = await this.repository.save(CommentEntity.of(comment))

    return newComment.toDomain()
  }

  async findById(id: number): Promise<Comment> {
    const commentEntity = await this.repository.findOne({
      where: { id },
      relations: ["user"],
    })

    if (!commentEntity) {
      return null
    } else {
      return commentEntity.toDomain()
    }
  }

  async findParentByPostId(
    id: number,
    skip: number,
    take: number,
    me?: number
  ): Promise<[Comment[], number]> {
    const commentEntities = await this.dataSource.manager.query(
      `
        SELECT c.id, c.text, c.parentPostId, c.parentCommentId, numChildComments, point, cv.value as 'like', user.id as userId, user.username, c.createdAt, c.updatedAt
        FROM comment c LEFT JOIN user ON c.userId = user.id
        LEFT JOIN (
          SELECT comment.id, IFNULL(SUM(cv.value),0) as point FROM comment
          LEFT JOIN commentVote cv ON comment.id = cv.commentId
          GROUP BY comment.id
         ) scv ON c.id = scv.id
        LEFT JOIN (
          SELECT comment.parentCommentId, COUNT(comment.parentCommentId) numChildComments
          FROM comment
          GROUP BY comment.parentCommentId) cc
          ON c.id = cc.parentCommentId
        LEFT JOIN commentVote cv ON (c.id = cv.commentId AND cv.userId = ${me})
        WHERE c.parentPostId = ? AND c.parentCommentId IS NULL

        LIMIT ? OFFSET ?;
      `,
      [id, take, skip]
    )

    const total = await this.countParentByPostId(id)

    return [
      commentEntities.map((item) => {
        const { userId, username, numChildComments, point, like, ...rest } =
          item
        return Comment.create({
          ...rest,
          user: { id: userId, username },
          numChildComments: parseInt(numChildComments),
          point: parseInt(point),
          like: like == 1 ? true : like == -1 ? false : null,
        })
      }),
      total,
    ]
  }

  async findChildByPostId(
    id: number,
    skip: number,
    take: number,
    me?: number
  ): Promise<[Comment[], number]> {
    const commentEntities = await this.dataSource.manager.query(
      `
        SELECT c.id, c.text, c.parentPostId, c.parentCommentId, numChildComments, point, cv.value as 'like', user.id as userId, user.username, c.createdAt, c.updatedAt
        FROM comment c LEFT JOIN user ON c.userId = user.id
        LEFT JOIN (
          SELECT comment.id, IFNULL(SUM(cv.value),0) as point FROM comment
          LEFT JOIN commentVote cv ON comment.id = cv.commentId
          GROUP BY comment.id
         ) scv ON c.id = scv.id
        LEFT JOIN (
          SELECT comment.parentCommentId, COUNT(comment.parentCommentId) numChildComments
          FROM comment
          GROUP BY comment.parentCommentId) cc
          ON c.id = cc.parentCommentId
        LEFT JOIN commentVote cv ON (c.id = cv.commentId AND cv.userId = ${me})
        WHERE c.parentCommentId = ?
        LIMIT ? OFFSET ?;
      `,
      [id, take, skip]
    )

    const total = await this.countChild(id)

    return [
      commentEntities.map((item) => {
        const { userId, username, numChildComments, point, like, ...rest } =
          item
        return Comment.create({
          ...rest,
          user: { id: userId, username },
          numChildComments: parseInt(numChildComments),
          point: parseInt(point),
          like: like == 1 ? true : like == -1 ? false : null,
        })
      }),
      total,
    ]
  }

  async countParentByPostId(id: number): Promise<number> {
    return await this.repository.count({
      where: { parentPostId: id, parentCommentId: IsNull() },
    })
  }

  async countChild(commentId: number) {
    return await this.repository.count({
      where: { parentCommentId: commentId },
    })
  }

  async editText(id: number, text: string): Promise<Boolean> {
    const { affected } = await this.repository.update(id, { text })
    return !!affected
  }
}
