import { DataSource, Repository } from "typeorm"
import { CommentVoteRepository } from "../domain/repository/CommentVoteRepository"
import { CommentEntity } from "./CommentEntity"
import Types from "../../../config/Types"
import { inject, injectable } from "inversify"
import { CommentVote } from "../domain/model/CommentVote"
import { CommentVoteEntity } from "./CommentVoteEntity"

@injectable()
export class CommentVoteOrmRepository implements CommentVoteRepository {
  private readonly commentVoteRepository: Repository<CommentVoteEntity>
  private readonly commentRepository: Repository<CommentEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.commentVoteRepository = dataSource.getRepository(CommentVoteEntity)
    this.commentRepository = dataSource.getRepository(CommentEntity)
  }

  async upvote(commentId: number, userId: number): Promise<CommentVote> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    })

    if (!comment) {
      return null
    }

    const exVote = await this.commentVoteRepository.findOne({
      where: { commentId, userId },
    })

    if (exVote) {
      exVote.value = 1
      const result = await this.commentVoteRepository.save(exVote)
      return result.toDomain()
    } else {
      const vote = this.commentVoteRepository.create({
        commentId,
        userId,
        value: 1,
      })
      const result = await this.commentVoteRepository.save(vote)
      return result.toDomain()
    }
  }

  async downvote(commentId: number, userId: number): Promise<CommentVote> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    })

    if (!comment) {
      return null
    }

    const exVote = await this.commentVoteRepository.findOne({
      where: { commentId, userId },
    })

    if (exVote) {
      exVote.value = -1
      const result = await this.commentVoteRepository.save(exVote)
      return result.toDomain()
    } else {
      const vote = this.commentVoteRepository.create({
        commentId,
        userId,
        value: -1,
      })
      const result = await this.commentVoteRepository.save(vote)
      return result.toDomain()
    }
  }

  async deleteVote(commentId: number, userId: number): Promise<Boolean> {
    const { affected } = await this.commentVoteRepository.delete({
      commentId,
      userId,
    })
    return !!affected
  }
}
