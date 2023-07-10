import { CreatePostService } from "./CreatePostService"
import { mock, mockClear } from "jest-mock-extended"
import { User } from "../../../user/domain/model/User"
import { UserPassword } from "../../../user/domain/model/UserPassword"
import { Post } from "../../domain/model/Post"
import { PostRepository } from "../../domain/repository/PostRepository"
import { CategoryRepository } from "../../../category/domain/repository/CategoryRepository"
import { DataSource, QueryRunner } from "typeorm"
import { CreatePostRequest } from "./CreatePostRequest"

const dataSource = {
  createQueryRunner: () => {
    return qr
  },
} as DataSource
const qr = {
  manager: {},
} as QueryRunner

qr.startTransaction = jest.fn()
qr.commitTransaction = jest.fn()
qr.rollbackTransaction = jest.fn()
qr.release = jest.fn()

describe("CreatePostService", () => {
  let sut: CreatePostService
  const mockedPostRepository = mock<PostRepository>()
  const mockedCategoryRepository = mock<CategoryRepository>()

  beforeEach(() => {
    sut = new CreatePostService(
      mockedPostRepository,
      mockedCategoryRepository,
      dataSource
    )
    mockClear(mockedPostRepository)
    mockClear(mockedCategoryRepository)
  })

  it("it should return new post ", async () => {
    //arrange
    const title = "title title"
    const content = "content"
    const user = User.create({
      id: 1,
      email: "user@example.com",
      username: "user1",
    })
    const userId = 1
    const categories = ["one", "two"]
    const dto = new CreatePostRequest({ title, content, userId, categories })

    // mockedDataSource.createQueryRunner.mockResolvedValueOnce(qr)
    mockedPostRepository.save.mockResolvedValueOnce(
      Post.create({ title, content, userId })
    )

    //act
    const post = await sut.execute(dto)

    //assert
    expect(post.title.toString()).toEqual("title title")
    expect(post.content).toEqual("content")
    expect(post.userId).toEqual(1)
  })
})
