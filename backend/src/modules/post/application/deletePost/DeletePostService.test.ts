import { mock, mockClear } from "jest-mock-extended"
import { DeletePostService } from "./DeletePostService"
import { PostRepository } from "../../domain/repository/PostRepository"
import { BadRequest, NotFound } from "../../../../shared/util/exceptions"

describe("DeletePostService", () => {
  let sut: DeletePostService
  const mockedPostRepository = mock<PostRepository>()

  beforeEach(() => {
    sut = new DeletePostService(mockedPostRepository)
    mockClear(mockedPostRepository)
  })

  it("it should return True when post deleted", async () => {
    //arrange
    const id = 1
    mockedPostRepository.delete.mockResolvedValueOnce(true)

    //act
    const result = await sut.execute(id)

    //assert
    expect(result).toEqual(true)
  })

  it("it should throw error if fail to delete", async () => {
    //arrange
    const id = 1
    mockedPostRepository.delete.mockResolvedValueOnce(false)

    //act & assert
    await expect(async () => {
      await sut.execute(id)
    }).rejects.toThrowError(new NotFound(`Couldn't find a post by id {${id}}.`))
  })
})
