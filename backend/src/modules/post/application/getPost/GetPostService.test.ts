import { mock, mockClear } from "jest-mock-extended"
import { GetPostService } from "./GetPostService"
import { PostRepository } from "../../domain/repository/PostRepository"
import { NotFound } from "../../../../shared/util/exceptions"

describe("GetPostService", () => {
  let sut: GetPostService
  const mockedPostRepository = mock<PostRepository>()

  beforeEach(() => {
    sut = new GetPostService(mockedPostRepository)
    mockClear(mockedPostRepository)
  })

  it("it should throw error if post not exist", async () => {
    //arrange
    const id = 1
    mockedPostRepository.findById.mockResolvedValueOnce(null)

    //act & assert
    await expect(async () => {
      await sut.execute(id)
    }).rejects.toThrowError(new NotFound(`Couldn't find a post by id {${id}}.`))
  })
})
