import { inject, injectable } from "inversify"
import { PostVoteRepository } from "../domain/repository/PostVoteRepository"
import { DataSource, Repository } from "typeorm"
import { PostVoteEntity } from "./PostVoteEntity"
import Types from "../../../config/Types"
import { PostVote } from "../domain/model/PostVote"

@injectable()
export class PostVoteOrmRepository implements PostVoteRepository {
  private readonly repository: Repository<PostVoteEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository(PostVoteEntity)
  }

  async getVoteForPostByUserId(
    postId: number,
    userId: number
  ): Promise<PostVote> {
    const vote = await this.repository.findOne({
      where: { postId, userId },
    })
    return vote
  }

  async countByPostId(postId: number): Promise<number> {
    const result = await this.dataSource.query(
      `SELECT SUM(value) as point FROM postVote WHERE postId = ?;`,
      [postId]
    )
    if (!result) {
      return null
    } else {
      return parseInt(result[0].point)
    }
  }

  async upvote(postId: number, userId: number): Promise<PostVote> {
    const exVote = await this.getVoteForPostByUserId(postId, userId)

    if (exVote) {
      exVote.value = 1
      const result = await this.repository.save(exVote)
      return result.toDomain()
    } else {
      const vote = this.repository.create({ postId, userId, value: 1 })
      const result = await this.repository.save(vote)
      return result.toDomain()
    }
  }

  async downvote(postId: number, userId: number): Promise<PostVote> {
    const exVote = await this.getVoteForPostByUserId(postId, userId)

    if (exVote) {
      exVote.value = -1
      const result = await this.repository.save(exVote)
      return result.toDomain()
    } else {
      const vote = this.repository.create({ postId, userId, value: -1 })
      const result = await this.repository.save(vote)
      return result.toDomain()
    }
  }

  async deleteVote(postId: number, userId: number): Promise<Boolean> {
    const { affected, ...rest } = await this.repository.delete({
      postId,
      userId,
    })

    return !!affected
  }
}
