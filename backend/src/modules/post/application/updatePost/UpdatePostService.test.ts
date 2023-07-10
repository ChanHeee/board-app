import { mock, mockClear } from "jest-mock-extended"

import { UpdatePostService } from "./UpdatePostService"
import { PostRepository } from "../../domain/repository/PostRepository"
import { CategoryRepository } from "../../../category/domain/repository/CategoryRepository"
import { Category } from "../../../category/domain/model/Category"
import { Post } from "../../domain/model/Post"
import { NotFound } from "../../../../shared/util/exceptions"
import { User } from "../../../user/domain/model/User"

describe("UpdatePostService", () => {
  let sut: UpdatePostService
  const mockedPostRepository = mock<PostRepository>()
  const mockedCategoryRepository = mock<CategoryRepository>()

  beforeEach(() => {
    sut = new UpdatePostService(mockedPostRepository, mockedCategoryRepository)
    mockClear(mockedPostRepository)
  })

  it("it should return updated Post", async () => {
    //arrange
    const id = 1
    const title = "title title"
    const content = "content"
    const categories = [
      Category.create({ name: "one" }),
      Category.create({ name: "two" }),
    ]
    const user = User.create({
      id: 1,
      email: "user1@gmali.com",
      username: "user1",
    })
    const userId = 1
    const dto = mockedPostRepository.findWithUserId.mockResolvedValueOnce(
      Post.create({ title, content, categories, userId })
    )
    mockedPostRepository.save.mockResolvedValueOnce(
      Post.create({ title, content, categories, userId })
    )
    //act
    const result = await sut.execute({
      id,
      title,
      content,
      userId: 1,
      categories: ["one", "two"],
    })

    //assert
    expect(result.title.toString()).toEqual(title)
    expect(result.content).toEqual(content)
    expect(result.categories.map((name) => name)).toEqual(["one", "two"])
  })

  it("it should throw error if post not exist", async () => {
    //arrange
    const id = 1
    const title = "title"
    const content = "content"
    const categories = [
      Category.create({ name: "one" }),
      Category.create({ name: "two" }),
    ]
    mockedPostRepository.findById.mockResolvedValueOnce(null)

    //act & assert
    await expect(async () => {
      await sut.execute({
        id,
        title,
        content,
        userId: 1,
        categories: ["one", "two"],
      })
    }).rejects.toThrowError(
      new NotFound(`Couldn't find a post by id: [${id}].`)
    )
  })

  // it("it should throw error if title'length is less that 3", async () => {
  //   //arrange
  //   const id = 1
  //   const title = "title"
  //   const content = "content"
  //   const categories = [
  //     new Category({ name: "one" }),
  //     new Category({ name: "two" }),
  //   ]
  //   mockedPostRepository.findById.mockResolvedValueOnce(
  //     Post.create({ title, content, categories })
  //   )

  //   //act & assert
  //   await expect(async () => {
  //     await sut.execute({o1, "sh", "content"})
  //   }).rejects.toThrowError(
  //     new Error("Minimal length is 3. [Title Value Object]")
  //   )
  // })
})
