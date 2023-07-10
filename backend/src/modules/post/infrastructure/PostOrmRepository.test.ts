import { PostOrmRepository } from "./PostOrmRepository"
import { AppDataSource } from "../../../config/DbConfig"
import { Post } from "../domain/model/Post"
import { PostTitle } from "../domain/model/PostTitle"
import { Category } from "../../category/domain/model/Category"
import { User } from "../../user/domain/model/User"
import { UserPassword } from "../../user/domain/model/UserPassword"

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

      //assert
      expect(result.title.value).toEqual(title)
      expect(result.content).toEqual(content)
      newPostId = result.id
    })
    //   it("it should be able to update Post", async () => {
    //     //arrange
    //     const title = "title"
    //     const content = "content"
    //     const post = Post.create({ title: PostTitle.create(title), content })

    //     //act
    //     post.update({
    //       title: PostTitle.create("newTitle"),
    //       content: "newContent",
    //       categories: [Category.create({ name: "one" })],
    //     })
    //     const result = await sut.save(post)

    //     //assert
    //     expect(result.title.toString()).toEqual("newTitle")
    //     expect(result.content).toEqual("newContent")
    //     expect(result.categories).toEqual([
    //       Category.create({ id: 1, name: "one" }),
    //     ])
    //   })
    // })

    describe("findById()", () => {
      it("it should return Post by id", async () => {
        //arrange
        const id = 1

        //act
        const result = await sut.findById(id)

        //assert
        expect(result.title.value).toEqual("title")
        expect(result.content).toEqual("content")
      })
      it("it should return null if not exist", async () => {
        //arrange
        const id = 10

        //act
        const result = await sut.findById(id)
        //const all = await sut.findAll()
        //console.log(all)

        //assert
        expect(result).toEqual(null)
      })
    })

    describe("delete()", () => {
      it("it should return ture if successfully deleted", async () => {
        const result = await sut.delete(newPostId)

        expect(result).toBeTruthy()
      })
    })
  })
})
