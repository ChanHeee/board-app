import { CommentOrmRepository } from "./CommentOrmRepository"
import { AppDataSource } from "../../../config/DbConfig"
import { Comment } from "../domain/model/Comment"
import { PostOrmRepository } from "../../post/infrastructure/PostOrmRepository"
import { Post } from "../../post/domain/model/Post"
import { PostTitle } from "../../post/domain/model/PostTitle"
import { User } from "../../user/domain/model/User"

describe("CommentOrmRepository", () => {
  let sut: CommentOrmRepository
  let postRepo: PostOrmRepository

  beforeEach(async () => {
    await AppDataSource.initialize()
    sut = new CommentOrmRepository(AppDataSource)
    postRepo = new PostOrmRepository(AppDataSource)
  })

  afterEach(async () => AppDataSource.destroy())

  describe("save()", () => {
    it("it should return new Comment", async () => {
      //arrange
      const parentPostId = 1
      const userId = 1
      const text = "comment test"
      const comment = Comment.create({ parentPostId, userId, text })

      const newComment = await sut.save(comment)

      expect(newComment.parentPostId).toEqual(parentPostId)
      expect(newComment.text).toEqual(text)
    })
  })
})
