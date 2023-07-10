import { log } from "console"
import { AppDataSource, TestDataSource } from "../../../config/DbConfig"
import { PostVoteOrmRepository } from "./PostVoteOrmRepository"
import { PostRepository } from "../domain/repository/PostRepository"
import { PostOrmRepository } from "./PostOrmRepository"
import { Post } from "../domain/model/Post"
import { User } from "../../user/domain/model/User"

describe("PostVoteOrmRepository", () => {
  let sut: PostVoteOrmRepository

  beforeEach(async () => {
    await AppDataSource.initialize()
    sut = new PostVoteOrmRepository(AppDataSource)
  })

  afterEach(async () => AppDataSource.destroy())

  describe("upvote", () => {
    it("it should return PostVote with value 1", async () => {
      const result = await sut.upvote(1, 1)

      expect(result.value).toEqual(1)
    })
  })

  describe("downvote", () => {
    it("it should return PostVote with value -1", async () => {
      const result = await sut.downvote(2, 1)

      expect(result.value).toEqual(-1)
    })
  })

  describe("countByPostId", () => {
    it("it should return total points", async () => {
      const point = await sut.countByPostId(1)

      expect(point).toEqual(1)
    })
  })

  describe("getVoteForPostByUserId", () => {
    it('it should return "Up" or "Down"', async () => {
      const result = await sut.getVoteForPostByUserId(1, 1)

      expect(result.postId).toEqual(1)
      expect(result.userId).toEqual(1)
      expect(result.value).toEqual(1)
    })
  })

  describe("deleteVote", () => {
    it("it should return true if vote successfully deleted", async () => {
      const result = await sut.deleteVote(1, 1)

      expect(result).toEqual(true)
    })
  })
})
