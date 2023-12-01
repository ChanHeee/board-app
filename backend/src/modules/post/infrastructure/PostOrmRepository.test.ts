import { PostOrmRepository } from "./PostOrmRepository"
import { Post } from "../domain/model/Post"
import AppDataSource from "../../../config/DbConfig"

describe("PostOrmRepository", () => {
  let sut: PostOrmRepository
  let newPostId: number

  beforeEach(async () => {
    await AppDataSource.initialize()
    sut = new PostOrmRepository(AppDataSource)
  })

  afterEach(async () => AppDataSource.destroy())

  describe("save()", () => {
    it("it should return new Post", async () => {
      //arrange
      const title = "test: PostRepository save()"
      const content = "tartarstrs"
      const post = Post.create({
        title,
        content,
        userId: 1,
      })
      //act
      const result = await sut.save(post)
      newPostId = result.id
      //assert
      expect(result.title.value).toEqual(title)
      expect(result.content).toEqual(content)
    })
  })

  describe("delete()", () => {
    it("it should return ture if successfully deleted", async () => {
      //arrange
      const id = newPostId
      //act
      const result = await sut.delete(id)
      //assert
      expect(result).toBeTruthy()
    })
  })

  describe("findById()", () => {
    it("it should return Post by id", async () => {
      //arrange
      const id = 1
      const title = "post title1"
      const content = "content content1"
      //act
      const result = await sut.findById(id)
      //assert
      expect(result.title.value).toEqual(title)
      expect(result.content).toEqual(content)
    })
    it("it should return null if not exist", async () => {
      //arrange
      const id = 1111
      //act
      const result = await sut.findById(id)
      //assert
      expect(result).toEqual(null)
    })
  })

  describe("findWithUserId", () => {
    it("it should return Post by id with userId", async () => {
      //arrange
      const id = 1
      const userId = 1
      const title = "post title1"
      const content = "content content1"

      //act
      const post = await sut.findWithUserId(id, userId)

      //assert
      expect(post.title.value).toEqual(title)
      expect(post.content).toEqual(content)
    })
    it("it should return null if not exist", async () => {
      //arrange
      const id = 1
      const userId = 11
      //act
      const result = await sut.findWithUserId(id, userId)

      //assert
      expect(result).toEqual(null)
    })
  })

  describe("findPosts", () => {
    it("it should return posts order by id newest", async () => {
      //arrange
      const skip: number = 0
      const take: number = 15
      const order: string = "newest"
      const me: number = 0
      //act
      const [posts, total] = await sut.findPosts(skip, take, order, me)

      //assert
      expect(total).toEqual(2)
      expect(
        posts.map((post) => {
          return post.id
        })
      ).toEqual([2, 1])
    })
  })
})
